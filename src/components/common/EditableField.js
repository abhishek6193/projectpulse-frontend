import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TextField, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const EditableFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DisplayText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => (theme.palette.mode === "dark" ? "#fff" : "#333")};
  cursor: pointer;
`;

const EditFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EditableField = ({ value, onSave, placeholderValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const inputRef = useRef(null);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    onSave(currentValue);
  }, [currentValue, onSave]);

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentValue(value);
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleSave();
      }
    },
    [handleSave]
  );

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, handleClickOutside]);

  return (
    <EditableFieldContainer>
      {isEditing ? (
        <EditFieldWrapper>
          <TextField
            ref={inputRef}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            size="small"
            placeholder={placeholderValue}
          />
          <IconButton onClick={handleSave} size="small">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
        </EditFieldWrapper>
      ) : (
        <DisplayText onClick={() => setIsEditing(true)}>
          {value || placeholderValue}
        </DisplayText>
      )}
    </EditableFieldContainer>
  );
};

export default EditableField;
