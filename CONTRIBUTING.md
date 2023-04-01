### SETUP

- Fork the organization’s repo to own individual GitHub account
- Copy URL to own fork from GitHub
    - Clone down fork in terminal with ‘git clone <FORKED REPO URL>’
- Add organization’s version of repo as an upstream remote with ‘git remote add upstream <ORGANIZATION REPO URL>’

### FLOW

- Before making any changes, check if on local main branch with ‘git checkout main’
- Before making changes, check if local main branch is in-sync with organizations main branch with ‘git pull upstream main’
- If wanting to make changes, create a branch specific to kind of changes to make with ‘git checkout -b <FEATURE BRANCH NAME>’
- Commit after changes
- Before submitting changes from feature branch, check if changes made and merged to organization’s main branch work with changes made on branch
    - pull changes from organization’s main branch to feature branch with ‘git pull upstream main’
    - test changes
- With changes incorporated, tested, and working, push changes branch changes to your origin with ‘git push origin <FEATURE BRANCH NAME>’
- Use GitHub interface to submit a pull request.
    - Team members review code and decide if it’s ready for merge with organization’s main
    - Submit merge