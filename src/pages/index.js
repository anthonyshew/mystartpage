import React, { useState, useEffect } from "react"
import '../styles/index.scss'
import { useStaticQuery, graphql } from "gatsby"

import Image from "gatsby-image"

export default ({ ...props }) => {
  const [date, setDate] = useState("")

  const data = useStaticQuery(graphql`
    query IndexQuery {
      backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      localhost: file(absolutePath: { regex: "/localhost.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      github: file(absolutePath: { regex: "/github.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      figma: file(absolutePath: { regex: "/figma.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      gmail: file(absolutePath: { regex: "/gmail.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      netlify: file(absolutePath: { regex: "/netlify.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      trello: file(absolutePath: { regex: "/trello.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      upwork: file(absolutePath: { regex: "/upwork.png/" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  useEffect(() => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let newDate = new Date()
    let day = dayArray[newDate.getDay()]
    let month = monthArray[newDate.getMonth()]
    let date = newDate.getDate()
    let year = newDate.getFullYear()
    let fullDate = `It's ${day}. ${month}, ${date}, ${year}.`
    setDate(fullDate)
  }, [])

  const backgrounds = data.backgrounds.edges
  const tiles = [
    {
      title: "Local Host",
      subtitle: "If you build it...",
      image: data.localhost.childImageSharp.fluid,
      link: "http://localhost:3000",
      bgColor: "#FFFFFF",
      color: "#000000"
    },
    {
      title: "Github",
      subtitle: "Les git it.",
      image: data.github.childImageSharp.fluid,
      link: "https://www.github.com",
      bgColor: "#000000",
      color: "#FFFFFF"
    },
    {
      title: "Figma",
      subtitle: "MUCH PRETTY",
      image: data.figma.childImageSharp.fluid,
      link: "https://www.figma.com/files/recent",
      bgColor: "#e6e6e6",
      color: "#944dff"
    },
    {
      title: "Netlify",
      subtitle: "Toolchain on fleek.",
      image: data.netlify.childImageSharp.fluid,
      link: "https://app.netlify.com/teams/anthonyshew/sites",
      bgColor: "teal",
      color: "white"
    },
    {
      title: "Gmail",
      subtitle: "MAAAILTIIIME",
      image: data.gmail.childImageSharp.fluid,
      link: "https://mail.google.com/mail/u/0/#inbox",
      bgColor: "#FF3333",
      color: "#FFFFFF"
    },
    {
      title: "Trello",
      subtitle: "Tan organizado.",
      image: data.trello.childImageSharp.fluid,
      link: "https://trello.com/anthonyshew1/boards",
      bgColor: "#0079bf",
      color: "#ffffff"
    },
    {
      title: "Upwork",
      subtitle: "Grrrinder.",
      image: data.upwork.childImageSharp.fluid,
      link: "https://www.upwork.com/ab/reports/in-progress",
      bgColor: "#1D4354",
      color: "#32CD32"
    },

  ]

  return (
    <div>
      <Image className="background" fluid={backgrounds[Math.floor(Math.random() * backgrounds.length)].node.childImageSharp.fluid}></Image>
      <div className="content-container">
        <p>{date}</p>
        <Search />
        <Links tiles={tiles} />
      </div>
    </div>
  )
}

const Search = ({ ...props }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="search">
      <form method="get" action="https://www.google.com/search">
        <input id="input" type="text"
          name="q"
          value={searchTerm}
          onChange={handleChange}
          autoComplete="off"
        />
        <input id="submit" type="submit" value="GOOGLE SMACK IT" />
      </form>
    </div>
  )
}

const Links = ({ tiles }) => {

  return (
    <div className="linktainer">
      {tiles.map((tile, index) => {

        const linkboxStyles = {
          backgroundColor: tile.bgColor,
          color: tile.color
        }

        return (
          <a key={tile.title} className="tile" href={tile.link} style={linkboxStyles}>
            <h1 className="tile-title">{tile.title}</h1>
            <h2 className="tile-desc">{tile.subtitle}</h2>
            <div className="tile-image-container"><Image className="tile-image" fluid={tile.image} alt={tile.title} /></div>
          </a>
        )
      })
      }
    </div>
  )
}
