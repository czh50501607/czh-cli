const basePrompt = [
  {
    type: 'input',
    name: 'appName',
    message: 'Project name?',
    default: 'new-czh-project',
  },
];

const TemplateTypePrompt = (templates) => {
  const prompts = [
    {
      type: 'list',
      name: 'type',
      message: 'Project type?',
      default: 'public-gulp',
      choices: templates.map((t) => t.type),
    },
  ];
  return [...basePrompt, ...prompts];
};

module.exports = {
  TemplateTypePrompt,
};
