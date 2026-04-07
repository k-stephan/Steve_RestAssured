module.exports = {
    default: {
      require: [
        'features/step-definitions/*.ts',
        'features/support/*.ts'
      ],
      requireModule: ['ts-node/register'],
      format: ['progress'],
      dryRun: false,
      tags: 'not @skip'
    }
  };