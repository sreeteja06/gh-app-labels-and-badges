import {Probot} from 'probot';
import assignPullRequestLabels from "./labels/pull-request-labels";
import assignReviewLabels from "./labels/review-labels";
import {createLabelsIfNotExists} from "./labels/label-helpers";
import {addChangeNotes} from "./summary";
import {Config} from "./config/config";

const preHook = async (context: any): Promise<{
    existingLabels: any;
    config: Config;
}> => {
    await createLabelsIfNotExists(context);
    const config = await context.config('labels-and-badges.yml');
    return {
        existingLabels: await context.octokit.issues.listLabelsOnIssue(context.issue()),
        config: new Config(config)
    }
}

const pullRequestHandler = async (context: any, skipChangeNotes: boolean) => {
    const {existingLabels, config} = await preHook(context);
    await assignPullRequestLabels(context, existingLabels, config);
    if (config.enableChangeNotes && !skipChangeNotes) {
        await addChangeNotes(context, config);
    }
}

export = (app: Probot) => {
    app.on('pull_request.opened', async (context) => {
        console.log('pull_request.opened')
        await pullRequestHandler(context, false);
    });

    app.on('pull_request.edited', async (context) => {
        console.log('pull_request.edited')
        await pullRequestHandler(context, true);
    });

    app.on('pull_request.reopened', async (context) => {
        console.log('pull_request.reopened')
        await pullRequestHandler(context, true);
    });

    app.on('pull_request.synchronize', async (context) => {
        console.log('pull_request.synchronize')
        await pullRequestHandler(context, false);
    });

    app.on('pull_request_review.submitted', async (context) => {
        console.log('pull_request_review.submitted')
        const { existingLabels } = await preHook(context);
        await assignReviewLabels(context, existingLabels);
    });

    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};
