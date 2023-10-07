interface SizeLabelConfig {
    lines: number;
}

interface ConfigFile {
    jira_url: string;
    pr_size_config: {
        xs: SizeLabelConfig;
        s: SizeLabelConfig;
        m: SizeLabelConfig;
        l: SizeLabelConfig;
        xl: SizeLabelConfig;
        xxl: SizeLabelConfig;
    }
    release_branch: string;
    enable_change_notes: boolean;
}

export class Config {
    readonly jiraUrl: string;
    readonly xsSizeLines: number;
    readonly sSizeLines: number;
    readonly mSizeLines: number;
    readonly lSizeLines: number;
    readonly xlSizeLines: number;
    readonly xxlSizeLines: number;
    readonly releaseBranch: string;
    readonly enableChangeNotes: boolean;

    constructor(configFile: ConfigFile) {
        this.jiraUrl = configFile?.jira_url || '';
        this.xsSizeLines = configFile?.pr_size_config?.xs?.lines || 10;
        this.sSizeLines = configFile?.pr_size_config?.s?.lines || 30;
        this.mSizeLines = configFile?.pr_size_config?.m?.lines || 100;
        this.lSizeLines = configFile?.pr_size_config?.l?.lines || 500;
        this.xlSizeLines = configFile?.pr_size_config?.xl?.lines || 1000;
        this.xxlSizeLines = configFile?.pr_size_config?.xxl?.lines || 10000;
        this.releaseBranch = configFile?.release_branch || 'main';
        this.enableChangeNotes = configFile?.enable_change_notes || false;
    }
}
