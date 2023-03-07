import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export function getCharacters(variables: any) {
  return useQuery(
    gql`
      query getCharacterList($page: Int, $name: String) {
        characters(page: $page, filter: { name: $name }) {
          info {
            count
            pages
          }
          results {
            id
            name
            image
            status
          }
        }
      }
    `,
    variables,
  )
}

export function getCharacter(id: any) {
  return useQuery(
    gql`
      query getCharacter($id: ID!) {
        character(id: $id) {
          id
          name
          image
          gender
          status
          species
          origin {
            id
            name
          }
          episode {
            id
            name
            episode
          }
        }
      }
    `,
    { id },
  )
}
