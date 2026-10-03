import type {StructureResolver} from 'sanity/structure'
import {ArchiveIcon} from '@sanity/icons/Archive'
import {BookIcon} from '@sanity/icons/Book'
import {CaseIcon} from '@sanity/icons/Case'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UserIcon} from '@sanity/icons/User'
import {WrenchIcon} from '@sanity/icons/Wrench'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Profil')
        .icon(UserIcon)
        .child(S.document().schemaType('profile').documentId('profile').title('Profil')),
      S.divider(),
      S.listItem()
        .title('Réalisations')
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList('project')
            .title('Réalisations')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Expériences')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('jobExperience')
            .title('Expériences')
            .defaultOrdering([{field: 'startYear', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Services')
        .icon(WrenchIcon)
        .child(
          S.documentTypeList('service')
            .title('Services')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Formations')
        .icon(BookIcon)
        .child(
          S.documentTypeList('educationalBackground')
            .title('Formations')
            .defaultOrdering([{field: 'year', direction: 'desc'}]),
        ),
      S.documentTypeListItem('clientReview').title('Témoignages').icon(CommentIcon),
      S.divider(),
      S.listItem()
        .title('Mentions légales')
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType('legalNotice')
            .documentId('legalNotice')
            .title('Mentions légales'),
        ),
      S.divider(),
      S.listItem()
        .title('Ancien site (obsolète)')
        .icon(ArchiveIcon)
        .child(
          S.list()
            .title('Ancien site (obsolète)')
            .items([
              S.documentTypeListItem('information').title('Informations personnelles'),
              S.documentTypeListItem('portfolioFilter').title('Filtres de portfolio'),
            ]),
        ),
    ])
