import styled from 'styled-components'

const ProjectsList = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-row-gap: 32px;
  list-style-type: none;
  padding-left: 0;
  margin: 48px auto;
  max-width: 320px;

  @media (min-width: 720px) {
    grid-template-columns: 47% 47%;
    max-width: 720px;
  }

  @media (min-width: 960px) {
    grid-template-columns: 31% 31% 31%;
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 23% 23% 23% 23%;
    max-width: 1200px;
  }
`

export default ProjectsList
