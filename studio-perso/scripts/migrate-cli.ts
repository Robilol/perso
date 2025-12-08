import {getCliClient} from 'sanity/cli'
import fs from 'fs'
import path from 'path'

// Utilise l'authentification CLI de Sanity (plus simple, pas besoin de token)
const client = getCliClient()

// Chemin vers les fichiers JSON
const dataDir = path.join(__dirname, '../../public/api')

// Fonction pour retirer les champs image (qui seront uploadés manuellement)
function removeImageFields(obj: any, imageFields: string[]): any {
  const cleaned = {...obj}
  imageFields.forEach((field) => {
    delete cleaned[field]
  })
  return cleaned
}

async function migrateData() {
  console.log('🚀 Début de la migration...\n')
  console.log('⚠️  Note: Les images seront à uploader manuellement dans le Studio\n')

  try {
    // 1. Migrer les informations personnelles (singleton)
    console.log('📝 Migration des informations personnelles...')
    const information = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'information.json'), 'utf-8')
    )
    const cleanedInfo = removeImageFields(information, ['thumbImage', 'largeImage'])
    await client.create({
      _type: 'information',
      ...cleanedInfo,
    })
    console.log('✅ Informations personnelles migrées (sans images)\n')

    // 2. Migrer les projets
    console.log('📁 Migration des projets...')
    const projects = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'portfolios.json'), 'utf-8')
    )
    for (const project of projects) {
      const {id, coverimage, imagegallery, ...projectData} = project
      await client.create({
        _type: 'project',
        _id: id,
        ...projectData,
      })
      console.log(`  ✓ Projet "${project.title}" migré (sans images)`)
    }
    console.log('✅ Tous les projets migrés\n')

    // 3. Migrer les services
    console.log('🛠️  Migration des services...')
    const services = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'services.json'), 'utf-8')
    )
    for (const service of services) {
      const {icon, ...serviceData} = service
      await client.create({
        _type: 'service',
        ...serviceData,
      })
      console.log(`  ✓ Service "${service.title}" migré (sans icône)`)
    }
    console.log('✅ Tous les services migrés\n')

    // 4. Migrer les expériences professionnelles
    console.log('💼 Migration des expériences professionnelles...')
    const jobExperiences = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'jobexperience.json'), 'utf-8')
    )
    for (const experience of jobExperiences) {
      await client.create({
        _type: 'jobExperience',
        ...experience,
      })
      console.log(`  ✓ Expérience "${experience.title}" migrée`)
    }
    console.log('✅ Toutes les expériences migrées\n')

    // 5. Migrer les formations
    console.log('🎓 Migration des formations...')
    const educations = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'educationbackground.json'), 'utf-8')
    )
    for (const education of educations) {
      await client.create({
        _type: 'educationalBackground',
        ...education,
      })
      console.log(`  ✓ Formation "${education.title}" migrée`)
    }
    console.log('✅ Toutes les formations migrées\n')

    // 6. Migrer les compétences techniques
    console.log('💻 Migration des compétences techniques...')
    const techSkills = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'techskills.json'), 'utf-8')
    )
    for (const skill of techSkills) {
      await client.create({
        _type: 'techSkill',
        ...skill,
      })
      console.log(`  ✓ Compétence "${skill.title}" migrée`)
    }
    console.log('✅ Toutes les compétences techniques migrées\n')

    // 7. Migrer les compétences linguistiques
    console.log('🗣️  Migration des compétences linguistiques...')
    const langSkills = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'languageskills.json'), 'utf-8')
    )
    for (const skill of langSkills) {
      await client.create({
        _type: 'languageSkill',
        ...skill,
      })
      console.log(`  ✓ Langue "${skill.title}" migrée`)
    }
    console.log('✅ Toutes les compétences linguistiques migrées\n')

    // 8. Migrer les filtres de portfolio
    console.log('🔍 Migration des filtres de portfolio...')
    const filters = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'portfoliofilters.json'), 'utf-8')
    )
    for (const filter of filters) {
      await client.create({
        _type: 'portfolioFilter',
        ...filter,
      })
      console.log(`  ✓ Filtre "${filter.title}" migré`)
    }
    console.log('✅ Tous les filtres migrés\n')

    // 9. Migrer les avis clients
    console.log('⭐ Migration des avis clients...')
    const reviews = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'clientsreview.json'), 'utf-8')
    )
    for (const review of reviews) {
      // Vérifier si l'avis a du contenu
      if (review.name && review.text) {
        const {image, ...reviewData} = review
        await client.create({
          _type: 'clientReview',
          ...reviewData,
        })
        console.log(`  ✓ Avis de "${review.name}" migré (sans photo)`)
      }
    }
    console.log('✅ Tous les avis clients migrés\n')

    console.log('🎉 Migration terminée avec succès !')
    console.log('\n📸 Prochaine étape : Uploadez les images manuellement dans le Studio')
    console.log('   → Ouvrez http://localhost:3333')
    console.log('   → Éditez chaque document pour ajouter les images correspondantes')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  }
}

// Exécuter la migration
migrateData()
