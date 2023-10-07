# GH App Labels and Badges

## Overview
Automatically label your Pull Requests based on various criteria to streamline your workflow and make it easier to manage and track changes. You can configure the labels, sizing criteria, and other behaviors to suit your project's needs.

## Sizing Labels

| Label           | Description                                         |
|-----------------|-----------------------------------------------------|
| **PR:size/XS**  | Added when additions or deletions are less than 10. |
| **PR:size/S**   | Added when additions or deletions are 10-30.        |
| **PR:size/M**   | Added when additions or deletions are 30-100.       |
| **PR:size/L**   | Added when additions or deletions are 100-500.      |
| **PR:size/XL**  | Added when additions or deletions are 500-1000.     |
| **PR:size/XXL** | Added when additions or deletions are over 1000.    |

## Other Labels

| Label                    | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| **release**              | Applied when the Pull Request is raised to the main branch.               |
| **feature**              | Applied when the branch name starts with "feat."                          |
| **bug**                  | Applied when the branch name starts with "fix" or "bug."                  |
| **chore**                | Applied when the branch name starts with "chore."                         |
| **no jira**              | Applied when the PR title or the head branch does not have a Jira ticket. |
| **PR:CONFLICT**          | Applied when there's a conflict in merging.                               |
| **PR:CHANGES REQUESTED** | Applied when a reviewer requests changes.                                 |
| **PR:APPROVED**          | Applied when a PR is approved.                                            |

## Change Notes
Whenever a PR is raised or updated, a comment with all the changes, including JIRA hyperlinks, is automatically added as release notes. You have the option to disable this feature via configuration.

## Configuration
### Default Configuration
To configure the behavior of the application, create a `.github/labels-and-badges.yml` file with the following YAML structure:

```yaml
jira_url: https://supercharged-dev.atlassian.net
pr_size_config:
  xs:
    lines: 10
  s:
    lines: 30
  m:
    lines: 100
  l:
    lines: 500
  xl:
    lines: 1000
release_branch: main
enable_change_notes: true
```

Adjust the settings as needed to match your project's requirements.

## Local Setup to Use

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t gh-app-labels-and-badges .

# 2. Start container
docker run --env-file ./.env -p 3000:3000 -d --name gh_app-labels gh-app-labels-and-badges:latest
```

## Contributing

If you have suggestions for how gh-app-labels-and-badges could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).


> A GitHub App built with [Probot](https://github.com/probot/probot)

# ROADMAP
- [ ] Setup CI/CD
- [ ] Setup Linters and git hooks
- [ ] 
