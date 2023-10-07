import {addLabelsOnIssue} from "./label-helpers";
import {Label} from "./labels";
import {Config} from "../config/config";

const assignPullRequestLabels = async (context: any, existingLabels: any, config: Config) => {
    // Get Pull Request Title from Context
    const pullRequest = context.payload.pull_request;
    const pullRequestTitle = pullRequest.title;
    const pullRequestFromBranch = pullRequest.head.ref;
    const pullRequestToBranch = pullRequest.base.ref;
    // Get number of lines added from Context
    const pullRequestAdditions = pullRequest.additions;
    // Get number of lines deleted from Context
    const pullRequestDeletions = pullRequest.deletions;

    const sizeLabel = pullRequestAdditions + pullRequestDeletions;
    let sizeLabelName = '';
    if (sizeLabel < config.xsSizeLines) {
        sizeLabelName = Label.PR_XS;
    } else if (sizeLabel < config.sSizeLines) {
        sizeLabelName = Label.PR_S;
    } else if (sizeLabel < config.mSizeLines) {
        sizeLabelName = Label.PR_M;
    } else if (sizeLabel < config.lSizeLines) {
        sizeLabelName = Label.PR_L;
    } else if (sizeLabel < config.xlSizeLines) {
        sizeLabelName = Label.PR_XL;
    } else {
        sizeLabelName = Label.PR_XXL;
    }

    const labelsToAdd = [sizeLabelName];

    // To Main? Add the release label
    if (pullRequestToBranch === config.releaseBranch) {
        labelsToAdd.push(Label.RELEASE);
    }

    // If the PR from branch starts with feat add the feature label
    if (pullRequestFromBranch.startsWith('feat')) {
        labelsToAdd.push(Label.FEATURE);
    }

    // If the PR from branch starts with fix or bug add the bug label
    if (pullRequestFromBranch.startsWith('fix') || pullRequestFromBranch.startsWith('bug')) {
        labelsToAdd.push(Label.BUG);
    }

    // If the PR from branch starts with chore add the chore label
    if (pullRequestFromBranch.startsWith('chore')) {
        labelsToAdd.push(Label.CHORE);
    }

    // If the PR includes the Jira ticket number add the Jira label
    // Jira ticket number is in the format ABC-123 and can be in the ticket title or the branch name
    // Example: A-1 - This is a Jira Ticket
    // Example: feat/AB-12-this-is-a-jira-ticket
    // Example: fix/ABC-123/this-is-a-jira-ticket
    // Example: ABCD-1234: This is a Jira Ticket
    // Example: ABCD-12345:This is a Jira Ticket
    if (!pullRequestTitle.match(/([A-Z]{1,4}-\d{1,5})/g) && !pullRequestFromBranch.match(/([A-Z]{1,4}-\d{1,5})/g)) {
        labelsToAdd.push(Label.NOJIRA);
    }

    // If the PR Has Conflict add the conflict label
    if (pullRequest.mergeable_state === 'dirty') {
        labelsToAdd.push(Label.PR_CONFLICT);
    }

    const labelsToDelete = [Label.PR_XS, Label.PR_S, Label.PR_M, Label.PR_L, Label.PR_XL, Label.PR_XXL];

    if (pullRequest.mergeable_state === 'clean') {
        labelsToDelete.push(Label.PR_CONFLICT);
    }

    await addLabelsOnIssue(context, labelsToAdd, labelsToDelete, existingLabels)
}

export default assignPullRequestLabels;
