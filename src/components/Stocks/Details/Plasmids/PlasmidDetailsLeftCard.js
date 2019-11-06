// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Chip from "@material-ui/core/Chip"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LeftCardHeader from "components/Stocks/Details/common/LeftCardHeader"
import DetailsListItem from "components/Stocks/Details/common/DetailsListItem"
import useStyles from "components/Stocks/Details/styles"
import { PlasmidDetailsProps } from "components/Stocks/Details/types/props"

const PlasmidDetailsLeftCard = ({ data }: PlasmidDetailsProps) => {
  const classes = useStyles()

  let imageMap
  if (data.image_map) {
    imageMap = <img src={data.image_map} alt={`Map for plasmid ${data.id}`} />
  } else {
    imageMap = ""
  }

  const publications = data.publications.map(ref => (
    <Chip
      key={ref.id}
      label={ref.id}
      component="a"
      href={`/publication/${ref.id}`}
      clickable
      deleteIcon={<FontAwesomeIcon icon="external-link-alt" />}
      onDelete={() => {}}
    />
  ))

  const genes =
    data.genes[0] !== ""
      ? data.genes.map(gene => (
          <Chip
            key={gene}
            label={gene}
            component="a"
            href={`/gene/${gene}`}
            clickable
            deleteIcon={<FontAwesomeIcon icon="external-link-alt" />}
            onDelete={() => {}}
          />
        ))
      : ""

  const rows = [
    {
      id: 0,
      title: "Name",
      content: data.name,
    },
    {
      id: 1,
      title: "Description",
      content: data.summary,
    },
    {
      id: 2,
      title: "GenBank Accession Number",
      content: data.genbank_accession,
    },
    {
      id: 3,
      title: "Depositor",
      content: data.depositor,
    },
    {
      id: 4,
      title: "Reference(s)",
      content: publications,
    },
    {
      id: 5,
      title: "Associated Genes",
      content: genes,
    },
    {
      id: 6,
      title: "Keywords",
      content: data.keywords,
    },
    {
      id: 7,
      title: "Image Map",
      content: imageMap,
    },
    {
      id: 8,
      title: "Sequence",
      content: data.sequence,
    },
  ]

  return (
    <Grid item xs={10} className={classes.header}>
      <Card className={classes.leftCard} raised>
        <Grid container>
          <List className={classes.list}>
            <ListItem divider className={classes.cardHeader}>
              <LeftCardHeader stockType="Plasmid" />
            </ListItem>
            {rows.map(data => (
              <DetailsListItem data={data} key={data.id} />
            ))}
          </List>
        </Grid>
      </Card>
    </Grid>
  )
}

export default PlasmidDetailsLeftCard
