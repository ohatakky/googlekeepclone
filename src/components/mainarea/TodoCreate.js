import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, Collapse, Button } from "@material-ui/core";
import TodoActions from "../todo/Actions";
import TodoLabels from "../todo/Labels";
import TodoContent from "../todo/Content";
import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  paperWrapper: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.short
    })
  },
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  inputTitleRoot: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.25, 2)
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: "1rem",
    padding: 0,
    lineHeight: "1rem",
    verticalAlign: "middle",
    color: theme.palette.text.primary
  },
  inputNoteRoot: {
    ...theme.custom.fontFamily.roboto,
    padding: theme.spacing(1.5, 2)
  },
  inputNoteInput: {
    fontWeight: 500,
    fontSize: "0.85rem",
    padding: 0,
    color: theme.palette.text.primary
  },
  barWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between"
  }
}));

export default function() {
  const classes = useStyles();
  const [isFocussed, setFocussed] = useState(false);
  const newNoteItem = useStoreState(state => state.notes.new);
  const updateNotesItem = useStoreActions(
    actions => actions.notes.updateNotesItem
  );
  const createNote = useStoreActions(actions => actions.notes.createNote);
  const onCloseClick = () => {
    createNote(newNoteItem);
    setFocussed(false);
  }

  return (
    <Paper
      elevation={2}
      classes={{ root: classes.paperWrapper }}
      style={{ backgroundColor: newNoteItem.color }}
    >
      <Collapse
        classes={{ wrapperInner: classes.wrapper }}
        in={isFocussed}
        collapsedHeight="2.7rem"
      >
        <InputBase
          placeholder={isFocussed ? "Title" : "Take a note..."}
          classes={{
            root: isFocussed ? classes.inputTitleRoot : classes.inputNoteRoot,
            input: classes.inputTitleInput
          }}
          onFocus={() => setFocussed(true)}
          inputProps={{ "aria-label": "note title" }}
          value={newNoteItem.title}
          onChange={event =>
            updateNotesItem({ id: "", key: "title", value: event.target.value })
          }
        />
        {isFocussed ? (
          <TodoContent
            id={""}
            noteItems={newNoteItem.notes}
            isEditMode={true}
            isCheckboxMode={newNoteItem.isCheckboxMode}
          />
        ) : null}
        <TodoLabels labels={newNoteItem.labels} />
        <div className={classes.barWrapper}>
          <TodoActions
            id={""}
            isCreateMode={true}
            isCheckboxMode={newNoteItem.isCheckboxMode}
            labels={newNoteItem.labels}
          />
          <div>
            <Button size="small" onClick={onCloseClick}>
              Close
            </Button>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
