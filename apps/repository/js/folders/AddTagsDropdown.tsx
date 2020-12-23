import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {MUIMenuItem} from "../../../../web/js/mui/menu/MUIMenuItem";
import {MUIMenu} from "../../../../web/js/mui/menu/MUIMenu";
import {deepMemo} from "../../../../web/js/react/ReactUtils";
import Box from '@material-ui/core/Box';

interface IProps {
    readonly onCreateFolder: () => void;
    readonly onCreateTag: () => void;
}

export const AddTagsDropdown = deepMemo((props: IProps) => {

    return (

        <MUIMenu button={{
                    icon: (
                        <Box color="text.secondary">
                            <AddIcon/>
                        </Box>
                    )
                 }}
                 placement="bottom-end">
            <div>

                <MUIMenuItem onClick={props.onCreateFolder}
                             icon={<CreateNewFolderIcon/>}
                             text="Create Folder"/>

                <MUIMenuItem onClick={props.onCreateTag}
                             icon={<LocalOfferIcon/>}
                             text="Create Tag"/>

            </div>

        </MUIMenu>

    );
});

