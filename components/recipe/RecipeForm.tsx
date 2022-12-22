import Image from 'next/image'
import { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { trashCanIconSrc, draggableIconSrc } from '../constants';
import styles from "../../styles/recipe/RecipeForm.module.css";
import inputStyles from "../../styles/common/input.module.css";
import titleStyles from "../../styles/common/title.module.css";

// page to add new list of items

resetServerContext();

const RecipeForm = ({ title, numbered, changeListState, initialItems }: { title: string, numbered: boolean, changeListState: (list: string[]) => void, initialItems?: string[] }) => {

    const grid = 8;

    // list of items that gets mapped
    const [items, setItems] = useState<string[]>([]);

    const singularTitle = title.slice(0, -1);


    // Array of refs: https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
    const inputRefs = useRef<HTMLInputElement[]>([]);


    useEffect(() => {
        // create an initial first item
        if (initialItems && initialItems.length > 0) {
            setItems([...initialItems])
        } else {
            addNewitem();
        }
    }, []);

    const reorder = (inputArg: string[], startIndex: number, endIndex: number) => {
        const list = Object.values(inputArg);
        const result: string[] = Array.from(list) as string[];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        setItems(result);
        // setInputs(inputArg);
        changeListState(result);
        return result;
    };

    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        // some basic styles to make the items look a bit nicer
        padding: grid * 20,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
    });

    const dragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        reorder(
            items,
            result.source.index,
            result.destination.index
        );
    }

    const deleteItem = (index: number) => {
        const itemsCopy = items;
        // remove out the index
        itemsCopy.splice(index, 1);
        reorder(itemsCopy, 0, 0);
    }

    const addNewitem = () => {
        const itemCopy = items;
        itemCopy.push("")
        setItems([...itemCopy]);
        // reorder(inputsCopy, 0, 0);
    }

    const handleInputChange = (value: string, index: number) => {
        // setInputs({ ...inputs, [e.target.name]: e.target.value });
        let itemCopy = items;
        itemCopy[index] = value;
        reorder(itemCopy, 0, 0);
    };

    const iconSize = "25px";

    return (
        <div className={styles["recipe-form"]}>
            <h1 className={titleStyles["generic-h1"]}>{title}</h1>
            {/* draggable recipe items */}
            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)} ref={provided.innerRef} className={styles["steps-form-container"]}>
                            {items.map((item, index: number) => {
                                // Array of refs assignment: https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
                                const currInputRef = (element: any) => (inputRefs.current?.push(element));
                                // disable strict-mode to make draggable work https://stackoverflow.com/questions/71819073/react-beautiful-dnd-unable-to-find-draggable-with-id-x
                                return (
                                    <div key={`recipe-${index}-recipe-form`} className={styles["single-item"]}>
                                        <Draggable key={`${title}-item-${index}-recipe-form`} draggableId={`${title}-item-${index}`} index={index}>
                                            {(provided, snapshot) => (
                                                <div style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className={styles["recipe-item"]}
                                                >
                                                    {/* Add one to start at item 1 */}
                                                    {numbered ? <label className={styles["recipe-item-number"]}>{index + 1}. </label> : null}
                                                    <textarea name={`item-${index}`} value={items[index]} placeholder={`${singularTitle} ${index + 1}...`} onChange={(e) => { handleInputChange(e.target.value, index) }} ref={currInputRef} className={inputStyles["generic-textarea"]}></textarea>
                                                    <span className={styles["form-icons-container"]}>
                                                        <span>&nbsp;&nbsp;</span>
                                                        <Image className={styles["drag-icon"]} src={draggableIconSrc} alt={"Draggable Icon"} layout="fixed" width={iconSize} height={iconSize} />
                                                        <span>&nbsp;&nbsp;</span>
                                                        <Image className={styles["trash-icon"]} src={trashCanIconSrc} alt={"Trash Can Icon"} layout="fixed" width={iconSize} height={iconSize} onClick={() => {
                                                            console.log("Deleting step" + index);
                                                            deleteItem(index);
                                                        }} />
                                                    </span>

                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                )
                            })} {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={addNewitem} className={inputStyles["generic-btn"]}>
                Add new {singularTitle.toLowerCase()}
            </button>
        </div>
    )
};

export default RecipeForm;