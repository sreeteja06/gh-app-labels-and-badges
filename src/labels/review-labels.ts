import {addLabelsOnIssue} from "./label-helpers";
import {Label} from "./labels";

const assignReviewLabels = async (context: any, existingLabels: any) => {
    const labelsToDelete = [Label.PR_CHANGES_REQUESTED, Label.PR_APPROVED];
    const labelsToAdd = [];

    context.log.info("context.payload.review.state: " + context.payload.review.state);

    if (context.payload.review.state === 'changes_requested') {
        labelsToAdd.push(Label.PR_CHANGES_REQUESTED);
    } else if (context.payload.review.state === 'approved') {
        labelsToAdd.push(Label.PR_APPROVED);
    }

    await addLabelsOnIssue(context, labelsToAdd, labelsToDelete, existingLabels)
}

export default assignReviewLabels;
