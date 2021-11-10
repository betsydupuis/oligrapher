import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { nanoid } from 'nanoid/non-secure'

import { svgCoordinatesFromMouseEvent } from '../util/dimensions'

export interface CaptionAttributes {
  id?: string,
  text?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  font?: string,
  size?: string
  weight?: string
}

export interface Caption extends CaptionAttributes {
  id: string,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
  font: string,
  size: string,
  weight: string
}

export interface CaptionDefaults extends CaptionAttributes {
  width: number,
  height: number,
  font: string,
  size: string,
  weight: string
}

export const captionDefaults: CaptionDefaults = {
  width: 200,
  height: 100,
  font: 'Arial',
  size: '20',
  weight: '400'
}

export const captionShape = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export function newCaption(attributes: CaptionAttributes = {}): Caption {
  let caption = merge({ id: nanoid(10), text: "New Caption" }, captionDefaults, attributes)

  return caption as Caption
}

/// Event => Caption
export function fromEvent(event: MouseEvent): Caption {
  return newCaption({
    text: "New Caption",
    ...svgCoordinatesFromMouseEvent(event)
  })
}

export default {
  "new": newCaption,
  "fromEvent": fromEvent
}
