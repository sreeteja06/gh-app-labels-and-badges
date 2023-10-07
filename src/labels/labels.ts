export enum Label {
    PR_XS = 'PR:size/XS',
    PR_S = 'PR:size/S',
    PR_M = 'PR:size/M',
    PR_L = 'PR:size/L',
    PR_XL = 'PR:size/XL',
    PR_XXL = 'PR:size/XXL',
    RELEASE = 'release',
    FEATURE = 'feature',
    BUG = 'bug',
    CHORE = 'chore',
    NOJIRA = 'NO JIRA',
    PR_CHANGES_REQUESTED = 'PR:CHANGES REQUESTED',
    PR_APPROVED = 'PR:APPROVED',
    PR_CONFLICT = 'PR:CONFLICT'
}

export const labels: {
    name: string;
    color: string;
    description: string;
}[] = [
    {
        name: Label.PR_XS,
        color: 'e99695', // Light Red
        description: 'Denotes a Pull Request that changes 0-9 lines.'
    },
    {
        name: Label.PR_S,
        color: 'f4a460', // Sandy Brown
        description: 'Denotes a Pull Request that changes 10-29 lines.'
    },
    {
        name: Label.PR_M,
        color: 'ffcc66', // Light Orange
        description: 'Denotes a Pull Request that changes 30-99 lines.'
    },
    {
        name: Label.PR_L,
        color: 'ffd700', // Gold
        description: 'Denotes a Pull Request that changes 100-499 lines.'
    },
    {
        name: Label.PR_XL,
        color: 'ffdf00', // Yellow
        description: 'Denotes a Pull Request that changes 500-999 lines.'
    },
    {
        name: Label.PR_XXL,
        color: 'ffea00', // Amber
        description: 'Denotes a Pull Request that changes 1000+ lines.'
    },
    {
        name: Label.RELEASE,
        color: '00994d', // Green
        description: 'This PR is a release'
    },
    {
        name: Label.FEATURE,
        color: '33cc33', // Lime Green
        description: 'This PR is a feature'
    },
    {
        name: Label.BUG,
        color: 'ff0000', // Bright Red
        description: 'This PR is a bug'
    },
    {
        name: Label.CHORE,
        color: '6666ff', // Blue
        description: 'This PR is a chore'
    },
    {
        name: Label.NOJIRA,
        color: '00bfff', // Deep Sky Blue
        description: 'This PR does not have a Jira Ticket'
    },
    {
        name: Label.PR_CHANGES_REQUESTED,
        color: 'ff4500', // Orange Red
        description: 'Review Changes are requested'
    },
    {
        name: Label.PR_APPROVED,
        color: '008000', // Green
        description: 'Review is approved'
    },
    {
        name: Label.PR_CONFLICT,
        color: 'ff0000', // Bright Red
        description: 'This PR has a conflict'
    }
]
