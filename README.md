# ELEVATE Commons - Discourse Platform

A dedicated community platform for place-based funders focused on learning, evaluation, and transformative philanthropy.

## About ELEVATE

**Unite. Learn. ELEVATE** is a community for place-based funders, particularly those focused on learning and evaluation, to share insights, exchange best practices, and co-create innovative solutions.

### Mission
Transforming Place-Based Philanthropy by elevating not just our initiatives but the very communities we serve.

### Core Principles

1. **Transformational, not transactional** - We view data and evaluation as catalysts for transformative learning and growth
2. **Community at the center** - We prioritize community expertise and collaborate inclusively
3. **Bringing our whole selves** - We believe the best work happens when people can bring their whole selves and have fun
4. **Innovative progress** - We push boundaries and advance place-based funding to make a real difference

### Key Objectives

- **Take Action**: Co-design tools and strategies that redefine the boundaries of effective place-based philanthropy
- **Learn Collaboratively**: Discuss successes and setbacks and tap the hivemind to tackle tough challenges
- **Share Resources**: Access curated tools, templates, research and best practices
- **Expand Your Network**: Forge meaningful connections with fellow changemakers

## Repository Structure

```
ELEVATE/
├── README.md                          # This file
├── discourse/
│   ├── theme/                        # Custom theme files
│   │   ├── about.json               # Theme metadata
│   │   ├── common/                  # Common styles
│   │   │   ├── common.scss          # Main stylesheet
│   │   │   └── header.html          # Custom header
│   │   ├── desktop/                 # Desktop-specific styles
│   │   │   └── desktop.scss
│   │   └── mobile/                  # Mobile-specific styles
│   │       └── mobile.scss
│   ├── categories/                   # Category structure
│   │   └── categories.md            # Category definitions
│   ├── settings/                     # Site settings
│   │   ├── site-settings.yml        # General settings
│   │   └── email-templates/         # Custom email templates
│   ├── assets/                       # Images and media
│   │   ├── logos/                   # Logo files
│   │   └── icons/                   # Custom icons
│   └── content/                      # Content templates
│       ├── welcome-message.md       # Welcome message
│       ├── about.md                 # About page
│       └── guidelines.md            # Community guidelines
└── docs/                             # Documentation
    ├── installation.md              # Installation guide
    ├── customization.md             # Customization guide
    └── maintenance.md               # Maintenance guide
```

## Color Palette

Based on the ELEVATE brand:

- **Primary (Dark Accent)**: #2D3E50 (Deep blue-gray)
- **Secondary (Light Accent)**: #7FB3D5 (Light blue)
- **Accent**: #E67E22 (Orange)
- **Background Light**: #ECF0F1 (Light gray)
- **Background Dark**: #1A252F (Dark navy)
- **White**: #FFFFFF
- **Text Primary**: #2C3E50
- **Text Light**: #7F8C8D

## Typography

- **Headings**: Archivo Black (from website)
- **Body**: System fonts for optimal performance

## Installation

### Prerequisites

- Discourse instance (version 3.0+recommended)
- Admin access to Discourse
- SSH access (for advanced customizations)

### Quick Start

1. **Clone this repository**:
   ```bash
   git clone https://github.com/[your-org]/ELEVATE.git
   cd ELEVATE
   ```

2. **Install the custom theme**:
   - Navigate to Admin > Customize > Themes
   - Click "Install" and choose "From a git repository"
   - Enter the repository URL
   - Or upload the theme files directly

3. **Configure site settings**:
   - Import `discourse/settings/site-settings.yml`
   - Update site title, description, and contact information

4. **Set up categories**:
   - Follow the structure in `discourse/categories/categories.md`
   - Create categories with appropriate permissions

5. **Customize content**:
   - Add the welcome message from `discourse/content/welcome-message.md`
   - Update the About page with content from `discourse/content/about.md`

## Features

### Custom Theme Elements

- **Color scheme** matching ELEVATE brand identity
- **Custom header** with logo and navigation
- **Geometric design elements** (squares pattern) from the website
- **Responsive design** for mobile and desktop
- **Accessibility** features built-in

### Category Structure

- **General Discussion** - Open conversations about place-based philanthropy
- **Learning & Evaluation** - Share research, tools, and evaluation methods
- **Resource Library** - Curated tools, templates, and best practices
- **Collaboration Opportunities** - Find partners for co-investment and projects
- **Events & Webinars** - Community events and learning sessions
- **Success Stories** - Share wins and lessons learned

### Community Features

- **Member profiles** with organization affiliation
- **Private messaging** for collaboration
- **Polls and surveys** for community feedback
- **Document sharing** and collaborative editing
- **Event calendar** integration

## Customization

See `docs/customization.md` for detailed instructions on:

- Modifying the color scheme
- Adding custom plugins
- Configuring email templates
- Setting up integrations
- Creating custom badges

## Maintenance

Regular maintenance tasks:

- **Weekly**: Review flagged posts, welcome new members
- **Monthly**: Update resources, check analytics, moderate discussions
- **Quarterly**: Review category structure, update guidelines, gather feedback

See `docs/maintenance.md` for complete maintenance procedures.

## Support

### For Platform Issues

- Check the [Discourse Meta](https://meta.discourse.org/) community
- Review the [Discourse Documentation](https://docs.discourse.org/)

### For ELEVATE-Specific Questions

- Contact: hello@unitelearnelevate.com
- Website: https://www.unitelearnelevate.com

## Contributing

We welcome contributions from community members! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Add appropriate license information]

## Credits

**Facilitators**:
- Martena Reed
- Jennifer Marsack

**Platform**: Built on [Discourse](https://www.discourse.org/)

---

© 2025 Unite. Learn. ELEVATE
