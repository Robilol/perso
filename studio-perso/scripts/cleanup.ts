import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function cleanup() {
  console.log('🗑️  Suppression de tous les documents...\n')

  const types = [
    'information',
    'project',
    'service',
    'jobExperience',
    'educationalBackground',
    'techSkill',
    'languageSkill',
    'portfolioFilter',
    'clientReview',
  ]

  try {
    for (const type of types) {
      const result = await client.delete({
        query: `*[_type == "${type}"]`,
      })
      console.log(`✓ Supprimé ${result.results?.length || 0} document(s) de type "${type}"`)
    }

    console.log('\n✅ Nettoyage terminé ! Vous pouvez relancer la migration.')
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
    process.exit(1)
  }
}

cleanup()
