import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import styled from 'styled-components'
import { partial, sortBy, reverse, difference, filter } from 'lodash'
import { Container } from 'Components'
import DropdownGroup from './DropdownGroup'
import Dropdown from './Dropdown'
import ProjectsList from './ProjectsList'
import Project from './Project'

const Promo = styled.div`
  padding: 0 18px;

  a {
    &, &:link, &:active, &:hover {
      color: #00c7b7;
      text-decoration: none;
    }
  }
`

const withPromo = (promo, projects) => {
  projects.splice(3, 0, <Promo dangerouslySetInnerHTML={{ __html: promo }} key="__promo" />)
  return projects
}

const DropdownRow = styled.div`
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  > div {
    &:not(:first-child) {
      margin-top: 18px;

      @media (min-width: 800px) {
        margin-top: 0;
      }
    }
  }
`

class Home extends React.Component {
  state = {
    filter: {},
  }

  canShow = project => {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const filterName in this.state.filter) {
      const filter = this.state.filter[filterName]
      if (!filter) {
        // eslint-disable-next-line no-continue
        continue
      }

      const projectFilter = project.fieldValues[filterName]
      if (!projectFilter) {
        return
      }
      if (Array.isArray(projectFilter) && !projectFilter.includes(filter)) {
        return
      }
      if (!Array.isArray(projectFilter) && projectFilter !== filter) {
        return
      }
    }
    return true
  }

  sort = (sortObj = {}, projects) => {
    const sorted = sortBy(projects, project => {
      if (project[sortObj.field] instanceof String) {
        return project[sortObj.field].toLowerCase()
      }
      return project[sortObj.field]
    })

    if (sortObj.reverse) {
      const withSortField = filter(sorted, sortObj.field)
      const withoutSortField = difference(sorted, withSortField)
      return [...reverse(withSortField), ...withoutSortField]
    }

    return sorted
  }

  filter = projects => projects.filter(this.canShow)

  handleFilterChange = (filter, event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [filter]: event.target.value,
      },
    })
  }

  handleSortChange = event => {
    this.setState({ sort: event.target.value })
  }

  render () {
    return (
      <RouteData render={({
        projects = [],
        promo,
        sorts = [],
        filters = [],
        fields = [],
      }) => {
        const currentSort = this.state.sort || sorts[0].label
        const visibleProjects = this.sort(
          sorts.find(({ label }) => label === currentSort),
          this.filter(projects)
        )
        return (
          <Container>
            <SiteData render={({ titleHome }) => (
              <Head>
                <title>{titleHome}</title>
              </Head>
            )} />
            <DropdownRow>
              <DropdownGroup label="Filter">
                {filters.map(({ field, emptyLabel, values }) => (
                  <Dropdown
                    key={field}
                    field={field}
                    emptyLabel={emptyLabel}
                    options={values}
                    selection={this.state.filter[field]}
                    onChange={partial(this.handleFilterChange, field)}
                  />
                ))}
              </DropdownGroup>
              <DropdownGroup label="Sort">
                <Dropdown
                  name="sort"
                  options={sorts.map(({ label }) => label)}
                  selection={currentSort}
                  onChange={this.handleSortChange}
                />
              </DropdownGroup>
            </DropdownRow>
            <ProjectsList>
              {withPromo(promo, visibleProjects.map(project => (
                <li key={project.slug}>
                  <Project fields={fields} {...project} />
                </li>
              )))}
            </ProjectsList>
          </Container>
        )
      }} />
    )
  }
}

export default Home
