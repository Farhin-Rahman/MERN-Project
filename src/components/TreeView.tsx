import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface TreeViewProps {
  folderData: Folder[];
  expandedFolders: { [folderId: number]: boolean };
  toggleFolder: (folderId: number) => void;
  setExpandedFolders: (expandedFolders: { [folderId: number]: boolean }) => void;
}

const Folder = styled.div`
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TreeViewContainer = styled.div``;

const toggleFolder = (folderId: number, expandedFolders: { [folderId: number]: boolean }, setExpandedFolders: (expandedFolders: { [folderId: number]: boolean }) => void) => {
  setExpandedFolders((prevState) => ({
    ...prevState,
    [folderId]: !prevState[folderId],
  }));
};
// Replace with your actual backend URL
const backendUrl = 'http://localhost:port'; 

// Make a GET request to fetch folder structure
axios.get('http://localhost:3000/api/folder-structure')

  .then((response) => {
    // Handle the data from the response
    const folderData = response.data;
    // Do something with the folderData
  })
  .catch((error) => {
    // Handle errors
    console.error('Error:', error);
  });


const TreeView: React.FC<TreeViewProps> = ({ folderData, expandedFolders, toggleFolder, setExpandedFolders }) => {
  return (
    <TreeViewContainer>
      {folderData.map((folder) => (
        <Folder
          key={folder.id}
          onClick={() => toggleFolder(folder.id)}
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

// Example data structure
const folderData = [
  {
    id: 1,
    name: 'Folder 1',
    children: [
      { id: 2, name: 'Subfolder 1', children: [] },
      { id: 3, name: 'Subfolder 2', children: [] },
    ],
  },
];

// Render the TreeView component
<TreeView folderData={folderData} />;

export default TreeView;
