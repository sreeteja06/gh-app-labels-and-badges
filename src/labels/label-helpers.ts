import { labels } from "./labels";

/**
 * Add Labels if they do not exist and remove the relevant labels which may contain the labels to add in
 * which case we will neither add nor remove the label
 * @param context
 * @param labels
 * @param relevantLabelsToDelete
 * @param existingLabels
 */
export const addLabelsOnIssue = async (context: any, labels: string[], relevantLabelsToDelete: string[], existingLabels: any) => {
    if (!existingLabels) {
        existingLabels = await context.octokit.issues.listLabelsOnIssue(context.issue());
    }

    const labelsToAdd = labels.filter((label) => {
        return !existingLabels.data.some((existingLabel: any) => existingLabel.name === label);
    })

    const labelsToDelete = relevantLabelsToDelete.filter((label) => {
        return existingLabels.data.some((existingLabel: any) => existingLabel.name === label);
    }).filter((label) => {
        return !labels.includes(label);
    });

    if (labelsToAdd.length) {
        await context.octokit.issues.addLabels(context.issue({labels: labelsToAdd}));
    }

    if (labelsToDelete.length) {
        await Promise.allSettled(labelsToDelete.map(async (label) => {
            await context.octokit.issues.removeLabel(context.issue({name: label}));
        }));
    }
}

// The CreateLabels defines the labels that should be created with color and description
export const createLabelsIfNotExists = async (context: any) => {
    const existingLabels = await context.octokit.issues.listLabelsForRepo(context.repo());

    const filteredLabels = labels.filter((label) => {
        return !existingLabels.data.some((existingLabel: any) => existingLabel.name === label.name);
    });

    if (filteredLabels.length) {
        await Promise.allSettled(filteredLabels.map(async (label) => {
            await context.octokit.issues.createLabel(context.issue({
                name: label.name,
                color: label.color,
                description: label.description
            }));
        }));
    }
}
