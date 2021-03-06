/* eslint-disable */
export type PhenotypeData = {
  phenotype: string
  note: string
  assay?: string
  environment?: string
  publication: {
    doi: string
    id: string
  }
}

export type StrainDetails = {
  id: string
  label: string
  names: Array<string>
  systematic_name: string
  characteristics: Array<string>
  summary: string
  editable_summary?: string
  genetic_modification: string
  genotypes: Array<string>
  mutagenesis_method: string
  species: string
  parent: {
    id: string
    label: string
  }
  depositor: string
  plasmid: string
  publications: Array<{
    doi: string
    id: string
  }>
  dbxrefs: Array<string>
  genes: Array<string>
  phenotypes: Array<PhenotypeData>
  in_stock: boolean
}

export type StrainDetailsProps = {
  data: StrainDetails
}

export type PlasmidDetails = {
  id: string
  name: string
  summary: string
  depositor: string
  publications: Array<{
    id: string
    doi: string
  }>
  dbxrefs: Array<string>
  genes: Array<string>
  image_map: string
  sequence: string
  keywords: Array<string>
  genbank_accession: string
  in_stock: boolean
}

export type PlasmidDetailsProps = {
  data: PlasmidDetails
}

export type PhenotypeProps = {
  /** Phenotype data */
  item: PhenotypeData
}
