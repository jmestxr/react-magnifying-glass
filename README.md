# react-magnifying-glass
React component that zooms into any HTML element.

![demo](https://user-images.githubusercontent.com/87931905/212554523-e8198a6e-0f55-4161-b14f-e553e23d59ad.gif)


## Installation
To download react-magnifying-glass, run:
```console
npm i reactjs-magnifying-glass
```

## How it works
`MagnifyingGlass` component is inserted as a child of the target container that we want to zoom into. [html2canvas](https://github.com/niklasvh/html2canvas) is used to capture an image of the target container (and its children, except `MagnifyingGlass`) and reflected on the `MagnifyingGlass` as background image. Event listener is added to detect any mouse movement within the target container to update the image on the `MagnifyingGlass` to correspond to its position in the container.

## Docs

### MagnifyingGlass Props
| Name       | Type                | Default                                                                             | Description                                                                            |
|------------|---------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `zoom`       | `number`              | `2`                                                                                   | The zoom factor of the magnifying glass.                                               |
| `glassStyle` | `React.CSSProperties` | `{  border: "1px solid black",  borderRadius:"50%",  width:"50px",  height:"50px", }` | Custom CSS styling for the magnifying glass.                                           |
| `offsetTop`  | `number`              | `0`                                                                                   | Number of pixels that the cursor is to the top of the center of the magnifying glass.  |
| `offsetLeft` | `number`              | `0`                                                                                   | Number of pixels that the cursor is to the left of the center of the magnifying glass. |


## Limitations
CSS transitions and animations which can cause a change in visual representation of the target container are not supported. 

However, simple visual changes can be implemented via React state. Any state change of the target container will cause it rerender which will in turn cause `MagnifyingGlass` to rerender and update its image of the target container. An example is illustrated below:

![demo2](https://user-images.githubusercontent.com/87931905/212554809-13cea3a0-eefa-4bef-af3b-6ee6cfae35d0.gif)

## Usage
Insert the `MagnifyingGlass` component into any target container you want to zoom into:
```jsx
import { MagnifyingGlass } from "reactjs-magnifying-glass";

<ParentComponent> {/* your target container */}
    <MagnifyingGlass {/* props here */} />
    <ChildComponent>...</ChildComponent>
    <ChildComponent>...</ChildComponent>
    {/* ...other child components */}
</ParentComponent>
```
