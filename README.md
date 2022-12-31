# react-magnifying-glass
React component that zooms into any HTML element.

![demo](https://user-images.githubusercontent.com/87931905/210093233-e7ebeead-b213-43ea-a883-d414580f877a.gif)

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
CSS transitions and animations which can cause a change in visual representation of the target container are not supported (yet?). However, simple visual changes can be implemented via React state. Any state change of the target container will cause it rerender which will in turn cause `MagnifyingGlass` to rerender and update its image of the target container.

## Usage
Insert the `MagnifyingGlass` component into any target container you want to zoom into:
```jsx
<ParentComponent> {/* your target container */}
    <MagnifyingGlass {/* props here */} />
    <ChildComponent>...</ChildComponent>
    <ChildComponent>...</ChildComponent>
    {/* ...other child components */}
</ParentComponent>
```
