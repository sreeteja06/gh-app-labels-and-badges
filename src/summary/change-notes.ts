import {Config} from "../config/config";

export const addChangeNotes = async (context: any, config: Config) => {
    const pullRequest = context.payload.pull_request;

    const commits = await context.octokit.pulls.listCommits({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        pull_number: pullRequest.number
    });

    // Jira Ticket Number
    const jiraTicketNumber = pullRequest.title.match(/([A-Z]{1,4}-\d{1,5})/g) || pullRequest.head.ref.match(/([A-Z]{1,4}-\d{1,5})/g);
    const jiraTicketNumberString = jiraTicketNumber ? jiraTicketNumber[0] : '';

    const changeNotes = commits.data.map((commit: any) => {
        // Replace Jira Ticket Number with Link
        return commit.commit.message.replace(/([A-Z]{1,4}-\d{1,5})/g, `[$1](${config.jiraUrl}/browse/$1)`);
    }).join('\n');

    let body = '';

    if (jiraTicketNumberString) {
        body = `## Jira Ticket \n [${jiraTicketNumberString}](${config.jiraUrl}/browse/${jiraTicketNumberString})\n\n`;
    }

    body += `## Change Notes\n\n${changeNotes}`;

    await context.octokit.issues.createComment({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: pullRequest.number,
        body
    });
}
