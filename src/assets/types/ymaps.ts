import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing"

export interface ISuggestView {
  element: HTMLElement | string
  options?: ISuggestViewOptions
  destroy: () => void
}

export interface ISuggestViewOptions {
  boundedBy?: number[][]
  container?: HTMLElement
  layout?: string
  offset?: number[]
  provider?: string
  results?: number
  width?: number
  zIndex?: number
}

export type TYmapsHookProps<I> = (ymapsApi: YMapsApi | undefined, yMap: ymaps.Map | undefined) => I