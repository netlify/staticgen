import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { partial, sortBy, reverse, map, find, difference, filter } from 'lodash'
import Project from './Project'

const SORTS = [
  { field: 'stars', label: 'GitHub stars', reverse: true },
  { field: 'followers', label: 'Twitter followers', reverse: true },
  { field: 'title', label: 'Title' },
]

const Dropdown = ({ emptyLabel, options, selection, onChange }) => {
  return (
    <div className="dropdown">
      <select value={selection} className="dropdown-select" onChange={onChange}>
        {emptyLabel ? <option value="">{emptyLabel}</option> : null}
        {Object.entries(options).map(([ key, value ]) =>
          <option key={key} value={value}>{value}</option>
        )}
      </select>
    </div>
  );
};

const ControlLabel = styled.div`
  font-weight: 600;
  margin-left: 5px;
`

const StaticGenPromo = () =>
  <li className="project staticgen-promo">
    <h3>Get started with one click!</h3>
    <p>
      For generators with the "Deploy to Netlify" button, you can deploy a new site from a template with one click. Get HTTPS, continuous delivery, and bring a custom domain, free of charge.
    </p>
    <p>
      Want your own Deploy to Netlify button? <a href="https://www.netlify.com/docs/deploy_button/">Learn more here.</a>
    </p>
  </li>

const ProjectCard = ({ project }) =>
  <li className="project">
    <Project key={project.slug} { ...project }/>
  </li>

const withStaticGenPromo = arr => {
  arr.splice(3, 0, <StaticGenPromo key="static-gen-promo"/>)
  return arr
}

const Projects = ({ projects, filter, sort }) =>
  <div>
    <ul className="projects">
      {withStaticGenPromo(projects.map(project =>
        <ProjectCard key={project.slug} project={project}/>
      ))}
    </ul>
  </div>

class Home extends React.Component {
  state = {
    filter: {},
    sort: SORTS[0].label,
  }

  canShow = (project) => {
    const { license, templates, language } = this.state.filter
    const shouldHide = (license && project.license !== license)
      || (templates && project.templates !== templates)
      || (language && project.language !== language)
    return !shouldHide
  }

  getSort = label => {
    return find(SORTS, { label }) || {}
  }

  sort = projects => {
    const { sort } = this.state
    const sortObj = find(SORTS, { label: sort }) || {}
    const sorted = sortBy(projects, sortObj.field)

    if (sortObj.reverse) {
      const withSortField = filter(sorted, sortObj.field)
      const withoutSortField = difference(sorted, withSortField)
      return [ ...reverse(withSortField), ...withoutSortField ]
    }

    return sorted
  }

  filter = projects => {
    return projects.filter(this.canShow)
  }

  handleFilterChange = (filter, event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [filter]: event.target.value,
      }
    })
  }

  handleSortChange = event => {
    this.setState({ sort: event.target.value })
  }

  render() {
    const { language, templates, license } = this.state.filter
    const { sort } = this.state
    const sorts = map(SORTS, 'label')
    return (
      <RouteData render={({ dataAgeInDays, languages = [], templateTypes = [], licenses = [], projects = [] }) => {
        const visibleProjects = this.sort(this.filter(projects))
        return (
          <div className="main landing">
            <div className="projects-sort-filter-toolbar">
              <div className="projects-filters">
                <ControlLabel>Filter</ControlLabel>
                <Dropdown
                  emptyLabel="Any Language"
                  options={languages}
                  selection={language}
                  onChange={partial(this.handleFilterChange, 'language')}
                />
                <Dropdown
                  emptyLabel="Any Template"
                  options={templateTypes}
                  selection={templates}
                  onChange={partial(this.handleFilterChange, 'templates')}
                />
                <Dropdown
                  emptyLabel="Any License"
                  options={licenses}
                  selection={license}
                  onChange={partial(this.handleFilterChange, 'license')}
                />
              </div>
              <div className="projects-sort">
                <ControlLabel>Sort</ControlLabel>
                <Dropdown
                  name="sort"
                  options={sorts}
                  selection={sort}
                  onChange={this.handleSortChange}
                />
              </div>
            </div>
            <Projects
              dataAgeInDays={dataAgeInDays}
              projects={visibleProjects}
              filter={this.state.filter}
              sort={this.state.sort}
            />
          </div>
        );
      }}/>
    )
  }
}

export default Home;
