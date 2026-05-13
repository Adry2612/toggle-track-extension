export interface ProjectSummary {
  id: number;
  name: string;
  color: string;
  client_id: number | null;
  client_name: string | null;
}

export interface TagSummary {
  id: number;
  name: string;
}

export interface RunningTimer {
  id: number;
  start: string;
  description: string;
}

export interface TimeEntry {
  id: number;
  description: string;
  start: string;
  stop: string | null;
  duration: number;
  project_id: number | null;
  tag_ids: number[];
  tags: string[];
}

export class TogglApiClient {
  private authHeader(token: string): string {
    return `Basic ${Buffer.from(`${token}:api_token`).toString('base64')}`;
  }

  async validateToken(token: string): Promise<{ fullname?: string }> {
    const res = await fetch('https://api.track.toggl.com/api/v9/me', {
      method: 'GET',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Token inválido');
    }
    return res.json() as Promise<{ fullname?: string }>;
  }

  async getWorkspaceId(token: string): Promise<number | null> {
    const res = await fetch('https://api.track.toggl.com/api/v9/me', {
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) { return null; }
    const me = await res.json() as { default_workspace_id?: number };
    return me.default_workspace_id ?? null;
  }

  async getRunningTimer(token: string): Promise<RunningTimer | null> {
    const res = await fetch('https://api.track.toggl.com/api/v9/me/time_entries/current', {
      headers: { Authorization: this.authHeader(token) },
    });
    if (!res.ok) { return null; }
    const data = await res.json() as { id?: number; start?: string; description?: string } | null;
    if (!data || !data.id) { return null; }
    return { id: data.id, start: data.start ?? new Date().toISOString(), description: data.description ?? '' };
  }

  async getRecentEntries(token: string): Promise<TimeEntry[]> {
    const res = await fetch('https://api.track.toggl.com/api/v9/me/time_entries', {
      headers: { Authorization: this.authHeader(token) },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`API ${res.status}: ${body || res.statusText}`);
    }
    const raw = await res.json() as Array<{
      id: number;
      description?: string;
      start: string;
      stop?: string;
      duration: number;
      project_id?: number | null;
      tag_ids?: number[];
      tags?: string[];
    }>;
    return raw
      .filter(e => e.duration > 0)
      .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
      .slice(0, 30)
      .map(e => ({
        id: e.id,
        description: e.description ?? '',
        start: e.start,
        stop: e.stop ?? null,
        duration: e.duration,
        project_id: e.project_id ?? null,
        tag_ids: Array.isArray(e.tag_ids) ? e.tag_ids : [],
        tags: Array.isArray(e.tags) ? e.tags : [],
      }));
  }

  async getProjects(token: string, workspaceId: number): Promise<ProjectSummary[]> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/projects?active=true`, {
      headers: { Authorization: this.authHeader(token) },
    });
    if (!res.ok) { return []; }
    const raw = await res.json() as Array<{ id: number; name: string; color?: string; client_id?: number | null; client_name?: string | null }>;
    return raw.map(p => this.toProjectSummary(p));
  }

  async getTags(token: string, workspaceId: number): Promise<TagSummary[]> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/tags`, {
      headers: { Authorization: this.authHeader(token) },
    });
    if (!res.ok) { return []; }
    const raw = await res.json() as Array<{ id: number; name: string }>;
    return raw.map(tag => this.toTagSummary(tag));
  }

  async startTimeEntry(token: string, workspaceId: number, params: {
    description: string;
    projectId?: number;
    tagIds?: number[];
  }): Promise<{ id: number; start: string }> {
    const body: Record<string, unknown> = {
      description: params.description,
      created_with: 'vscode-toggl',
      duration: -1,
      start: new Date().toISOString(),
      workspace_id: workspaceId,
    };
    if (params.projectId) { body.project_id = params.projectId; }
    if (params.tagIds && params.tagIds.length > 0) { body.tag_ids = params.tagIds; }

    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`, {
      method: 'POST',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error('Error al iniciar el timer.');
    }
    return res.json() as Promise<{ id: number; start: string }>;
  }

  async stopTimeEntry(token: string, workspaceId: number, entryId: number): Promise<void> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${entryId}/stop`, {
      method: 'PATCH',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Error al detener el timer.');
    }
  }

  async updateRunningEntryDescription(token: string, workspaceId: number, id: number, description: string): Promise<void> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${body || res.statusText}`);
    }
  }

  async updateRunningEntryStart(token: string, workspaceId: number, id: number, start: string): Promise<void> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ start }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${body || res.statusText}`);
    }
  }

  async createManualEntry(token: string, workspaceId: number, params: {
    description: string;
    start: string;
    stop: string;
    projectId?: number;
    tagIds?: number[];
  }): Promise<void> {
    const durationSecs = Math.round((new Date(params.stop).getTime() - new Date(params.start).getTime()) / 1000);
    const body: Record<string, unknown> = {
      description: params.description,
      created_with: 'vscode-toggl',
      start: params.start,
      stop: params.stop,
      duration: durationSecs,
      workspace_id: workspaceId,
    };
    if (params.projectId) { body.project_id = params.projectId; }
    if (params.tagIds && params.tagIds.length > 0) { body.tag_ids = params.tagIds; }
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`, {
      method: 'POST',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const bodyText = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${bodyText || res.statusText}`);
    }
  }

  async updateTimeEntry(token: string, workspaceId: number, id: number, data: {
    description: string;
    start: string;
    stop: string;
    duration: number;
    project_id: number | null;
    tag_ids: number[];
    tags: string[];
  }): Promise<void> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, workspace_id: workspaceId, created_with: 'vscode-toggl' }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${body || res.statusText}`);
    }
  }

  async deleteTimeEntry(token: string, workspaceId: number, id: number): Promise<void> {
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: this.authHeader(token) },
    });
    if (!res.ok && res.status !== 404) {
      throw new Error(`Error ${res.status}`);
    }
  }

  async createProject(token: string, workspaceId: number, input: {
    name: string;
    color: string;
    isPrivate: boolean;
  }): Promise<ProjectSummary> {
    if (!input.name) {
      throw new Error('El nombre del proyecto es obligatorio.');
    }
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/projects`, {
      method: 'POST',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: input.name,
        color: input.color || '#d8dbe5',
        is_private: input.isPrivate,
        active: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${body || res.statusText}`);
    }
    const raw = await res.json() as { id: number; name: string; color?: string; client_id?: number | null; client_name?: string | null };
    return this.toProjectSummary(raw);
  }

  async createTag(token: string, workspaceId: number, name: string): Promise<TagSummary> {
    if (!name) {
      throw new Error('El nombre de la etiqueta es obligatorio.');
    }
    const res = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/tags`, {
      method: 'POST',
      headers: {
        Authorization: this.authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Error ${res.status}: ${body || res.statusText}`);
    }
    const raw = await res.json() as { id: number; name: string };
    return this.toTagSummary(raw);
  }

  private toProjectSummary(project: { id: number; name: string; color?: string; client_id?: number | null; client_name?: string | null }): ProjectSummary {
    return {
      id: project.id,
      name: project.name,
      color: project.color ?? '#999',
      client_id: project.client_id ?? null,
      client_name: project.client_name ?? null,
    };
  }

  private toTagSummary(tag: { id: number; name: string }): TagSummary {
    return {
      id: tag.id,
      name: tag.name,
    };
  }
}
