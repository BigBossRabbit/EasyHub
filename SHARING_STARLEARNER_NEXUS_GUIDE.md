# Sharing the StarLearner-Nexus Skill with the Hermes Community

This guide explains how to publish the StarLearner-Nexus skill to the Hermes AI Skills Marketplace so other community members can discover, install, and use it.

## Overview

StarLearner-Nexus transforms GitHub starred repositories into reusable AI skills. Sharing this skill allows the Hermes community to benefit from automated skill generation based on their interests.

## Prerequisites

Before publishing, ensure you have:

1. **Hermes Agent installed** (v0.10.0 or later)
2. **GitHub Personal Access Token** configured (for API access and publishing)
3. **Git installed** and configured
4. **The StarLearner-Nexus skill** installed locally at `~/.hermes/skills/starlearner-nexus/`

## Step-by-Step Publishing Process

### 1. Prepare the Skill for Publication

First, verify the skill is properly formatted and functional:

```bash
# Navigate to the skill directory
cd ~/.hermes/skills/starlearner-nexus

# View the skill metadata to confirm it's correct
hermes skill view starlearner-nexus

# Test the skill to ensure it works
hermes skills run starlearner-nexus --scope test
```

### 2. Check Required Documentation

Ensure these files are present and complete:

- `SKILL.md` - Main skill definition (already present)
- `README.md` - Optional but recommended for detailed documentation
- `LICENSE` - License file (StarLearner-Nexus uses MIT)
- `references/` - Directory containing domain definitions and templates
- `scripts/` - Helper scripts for skill operation

### 3. Version Your Skill

Follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Incompatible API changes
- **MINOR**: Backward-compatible functionality additions
- **PATCH**: Backward-compatible bug fixes

To update the version in SKILL.md:

```bash
# Current version is 1.0.0 in the SKILL.md file
# To bump to 1.1.0 for a minor feature update:
sed -i '' 's/version: 1.0.0/version: 1.1.0/' SKILL.md

# Or use Hermes release tools if available
```

### 4. Publish to a GitHub Repository

The recommended way to share skills publicly is via a GitHub repository:

#### Option A: Create a Dedicated Repository

```bash
# Create a new GitHub repository (e.g., starlearner-nexus-hermes-skill)
# Initialize locally if you haven't already
cd ~/.hermes/skills/starlearner-nexus
git init
git add .
git commit -m "Initial commit: StarLearner-Nexus skill v1.0.0"

# Add GitHub remote (replace with your actual repo)
git remote add origin https://github.com/yourusername/starlearner-nexus-hermes-skill.git
git push -u origin main

# Create a GitHub release (optional but recommended)
gh release create v1.0.0 --title "StarLearner-Nexus v1.0.0" --notes "Initial release"
```

#### Option B: Publish via Hermes CLI

Hermes provides a direct publishing command:

```bash
# Publish the skill to a GitHub repository
hermes skills publish ~/.hermes/skills/starlearner-nexus \
  --to github \
  --repo yourusername/starlearner-nexus-hermes-skill \
  --tag v1.0.0 \
  --message "Release StarLearner-Nexus skill v1.0.0"
```

### 5. Register as a Skill Tap

Once published to GitHub, others can add it as a skill tap:

```bash
# Users can now add your skill repository as a tap:
hermes skills tap add yourusername/starlearner-nexus-hermes-skill

# They can then browse and install skills from your tap:
hermes skills browse --tap yourusername/starlearner-nexus-hermes-skill
hermes skills install starlearner-nexus --tap yourusername/starlearner-nexus-hermes-skill
```

### 6. Publish to the Official Hermes Skills Hub (Alternative)

For broader distribution, you can publish to the official Hermes Skills Hub:

```bash
# This requires maintainer approval but provides maximum visibility
hermes skills publish ~/.hermes/skills/starlearner-nexus \
  --to official-hub \
  --submit-for-review
```

Note: Official hub publication typically requires:
- Skill review by Hermes maintainers
- Adherence to additional quality guidelines
- Potential waiting period for approval

## Required Documentation Checklist

Ensure your skill includes these elements for successful publication:

### 1. SKILL.md Requirements
- [ ] Proper YAML frontmatter with name, description, version, author, license
- [ ] Clear description explaining what the skill does
- [ ] Version number following semantic versioning
- [ ] Appropriate tags (starlearner-nexus includes: [skill-generation, github, automation, learning, marketplace])
- [ ] Author and license information
- [ ] Related skills if applicable
- [ ] Required toolsets and tools declaration
- [ ] Required environment variables (GITHUB_TOKEN for StarLearner-Nexus)

### 2. Documentation Files
- [ ] README.md with:
  - Skill overview and purpose
  - Installation instructions
  - Usage examples
  - Configuration requirements
  - Troubleshooting tips
- [ ] LICENSE file (MIT for StarLearner-Nexus)
- [ ] CHANGELOG.md (recommended for version tracking)

### 3. Skill Structure
- [ ] Proper directory structure with SKILL.md at root
- [ ] Organized references/ directory with domain definitions
- [ ] Functional scripts/ directory with helper scripts
- [ ] Clean data/ and logs/ directories (generated at runtime)

## Promotion Strategies

After publishing, promote your skill to reach the Hermes community:

### 1. Announce in Community Channels
- Share in Hermes Discord/forums
- Post in relevant subreddits or developer communities
- Mention in Hermes-related newsletters or blogs

### 2. Create Demonstration Content
- Record a short video showing StarLearner-Nexus in action
- Write a blog post about transforming GitHub stars into AI skills
- Create example skills generated by your skill to showcase capabilities

### 3. Leverage GitHub Features
- Add detailed README with badges and screenshots
- Enable GitHub Releases for version tracking
- Use GitHub Topics: `hermes-skill`, `ai-skills`, `github-automation`
- Respond to issues and pull requests promptly

### 4. Engage with Users
- Monitor skill usage and feedback
- Respond to installation and usage questions
- Incorporate community suggestions into future versions
- Consider co-maintainers for popular skills

## Maintenance Best Practices

### Version Updates
When improving your skill:

1. Make changes in your local copy
2. Test thoroughly
3. Update version number in SKILL.md
4. Commit changes: `git commit -am "feat: improve skill generation accuracy"`
5. Tag release: `git tag v1.1.0`
6. Push and publish: `git push --follow-tags origin main`
7. Notify users via release notes or announcements

### Handling Issues
- Use GitHub Issues for bug tracking and feature requests
- Label issues appropriately (bug, enhancement, question)
- Close issues when resolved and reference in commit messages
- Consider implementing automated testing for skill functionality

## Legal and Ethical Considerations

### Licensing
- StarLearner-Nexus uses MIT license - permissive and community-friendly
- Ensure any included templates or references are compatible with MIT
- Clearly state licensing in SKILL.md and LICENSE files

### Attribution
- Give credit to original concept (BigBossRabbit/StarLearner-Nexus)
- Maintain author information in SKILL.md
- Respect licenses of any incorporated code or documentation

### Privacy and Security
- StarLearner-Nexus processes only public GitHub data
- User GitHub tokens remain local to their Hermes installation
- Generated skills contain only public repository information
- No external data transmission without explicit user consent

## Troubleshooting Publication Issues

### Common Problems and Solutions

**Problem**: "Skill validation failed"
- Solution: Check SKILL.md YAML format with `hermes skill view starlearner-nexus`
- Ensure all required fields are present and correctly formatted

**Problem**: "GitHub authentication failed"
- Solution: Verify GITHUB_TOKEN is set: `echo $GITHUB_TOKEN`
- Ensure token has `repo` and `workflow` scopes for publishing
- Reconfigure with: `hermes config set env.GITHUB_TOKEN your_token_here`

**Problem**: "Skill already exists in registry"
- Solution: Increment version number or use `--force` flag (use cautiously)
- For updates, always increase version number per semantic versioning

**Problem**: "Published skill not discoverable"
- Solution: Wait a few minutes for registry propagation
- Verify skill appears in: `hermes skills search starlearner-nexus`
- Check that you're searching the correct tap/repository

## Example Publication Workflow

Here's a complete example of publishing StarLearner-Nexus v1.1.0:

```bash
# 1. Navigate to skill directory
cd ~/.hermes/skills/starlearner-nexus

# 2. Update documentation if needed
echo "# StarLearner-Nexus v1.1.0" > README.md
echo "" >> README.md
echo "Improved categorization algorithms and new domain support." >> README.md

# 3. Bump version in SKILL.md
sed -i '' 's/version: 1.0.0/version: 1.1.0/' SKILL.md

# 4. Commit changes
git add SKILL.md README.md
git commit -m "feat: v1.1.0 - Improved categorization and new domains"
git tag v1.1.0
git push origin main --tags

# 5. Publish via Hermes CLI
hermes skills publish ~/.hermes/skills/starlearner-nexus \
  --to github \
  --repo yourusername/starlearner-nexus-hermes-skill \
  --tag v1.1.0 \
  --message "Release StarLearner-Nexus v1.1.0 with enhanced categorization"

# 6. Announce to community
# Share on Discord, forums, social media with installation instructions:
# hermes skills tap add yourusername/starlearner-nexus-hermes-skill
# hermes skills install starlearner-nexus --tap yourusername/starlearner-nexus-hermes-skill
```

## Conclusion

Sharing your StarLearner-Nexus skill with the Hermes community enables collaborative learning and skill development. By following this guide, you'll make your skill discoverable, installable, and maintainable for other Hermes users.

Remember that successful skill sharing involves:
- Proper documentation and versioning
- Clear installation and usage instructions
- Active maintenance and community engagement
- Adherence to licensing and ethical guidelines

Your contribution helps grow the Hermes ecosystem and empowers more users to benefit from AI-powered skill generation based on their GitHub interests.

---

*Guide created for sharing StarLearner-Nexus skill with the Hermes Community*
*Last updated: $(date +'%Y-%m-%d')*