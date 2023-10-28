import React from 'react';
import styled from 'styled-components/macro';



// Your styled-components for styling go here
const TreeViewContainer = styled.div``; // Make sure to add styles here

const Folder = styled.div``; // Make sure to add styles here

// Define the `toggleFolder` function and `Folder` component before using them in the TreeView component
const toggleFolder = (folderId, expandedFolders, setExpandedFolders) => {
  setExpandedFolders((prevState) => ({
    ...prevState,
    [folderId]: !prevState[folderId],
  }));
};
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
<StyledButton>Click me</StyledButton>

const TreeView: React.FC<TreeViewProps> = ({ folderData, expandedFolders, toggleFolder, setExpandedFolders }) => {
  return (
    <TreeViewContainer>
      {folderData.map((folder) => (
        <Folder
          key={folder.id}
          onClick={() => toggleFolder(folder.id, expandedFolders, setExpandedFolders)}
          isExpanded={expandedFolders[folder.id]}
        >
          {folder.name}
          {expandedFolders[folder.id] && (
            <TreeView
              folderData={folder.children}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
              setExpandedFolders={setExpandedFolders}
            />
          )}
        </Folder>
      ))}
    </TreeViewContainer>
  );
};


export default TreeView;
