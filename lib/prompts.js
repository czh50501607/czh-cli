const basePrompt = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
    default: 'new-czh-project',
  },
];

const TemplateTypePrompt = () => {
  const prompts = [
    {
      type: 'list',
      name: 'type',
      message: 'Project type?',
      default: 'public-gulp',
      choices: ['public-gulp'],
      // 'react', 'vue'
    },
  ];
  return [...BasePrompt.prompt, ...prompts];
};

module.exports = {
  TemplateTypePrompt,
};
