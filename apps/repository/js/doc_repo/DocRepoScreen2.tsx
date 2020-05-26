import {ListenablePersistenceLayerProvider} from "../../../../web/js/datastore/PersistenceLayer";
import {PersistenceLayerController} from "../../../../web/js/datastore/PersistenceLayerManager";
import React from "react";
import {FixedNav} from "../FixedNav";
import {RepositoryTour} from "../../../../web/js/apps/repository/RepositoryTour";
import {MUIPaperToolbar} from "../../../../web/js/mui/MUIPaperToolbar";
import {DocRepoButtonBar} from "./DocRepoButtonBar";
import {DocRepoFilterBar} from "./DocRepoFilterBar";
import {MessageBanner} from "../MessageBanner";
import {DocRepoTable2} from "../../../../web/spectron0/material-ui/doc_repo_table/DocRepoTable2";
import {Route, Switch} from "react-router";
import {ReactRouters} from "../../../../web/js/react/router/ReactRouters";
import {LeftSidebar} from "../../../../web/js/ui/motion/LeftSidebar";
import {DockLayout} from "../../../../web/js/ui/doc_layout/DockLayout";
import {FolderSidebar2} from "../folders/FolderSidebar2";
import {DeviceRouter} from "../../../../web/js/ui/DeviceRouter";
import {AddContent} from "../ui/AddContentButton";
import {RepoFooter} from "../repo_footer/RepoFooter";
import isEqual from "react-fast-compare";
import {RepoHeader} from "../repo_header/RepoHeader3";
import {DocRepoScreenRoutedComponents} from "./DocRepoScreenRoutedComponents";

namespace main {

    export const Documents = React.memo(() => (
        <>
            <DocRepoTable2 />
        </>
    ));

    export const Folders = React.memo(() => (
        <FolderSidebar2/>
    ));

}

const onClose = () => window.history.back();

const Router = () => (

    <Switch location={ReactRouters.createLocationWithHashOnly()}>

        <Route path='#folders'>
            {/*FIXME this is used for mobile and is broken under MUI now*/}
            <LeftSidebar onClose={onClose}>
                <main.Folders/>
            </LeftSidebar>
        </Route>

    </Switch>

);

namespace devices {

    export const PhoneAndTablet = React.memo(() => (
        <>
            <main.Documents/>
        </>
    ));

    export const Desktop = React.memo(() => (

        <DockLayout dockPanels={[
            {
                id: "dock-panel-left",
                type: 'fixed',
                component: <FolderSidebar2/>,
                width: 300,
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    overflow: 'none'
                }
            },
            {
                id: "doc-panel-center",
                type: 'grow',
                component: <main.Documents/>
            }
        ]}/>

    ));

}


interface IProps {

    readonly persistenceLayerProvider: ListenablePersistenceLayerProvider;

    readonly persistenceLayerController: PersistenceLayerController;

}

const DesktopToolbar = () => {
    return (
        <MUIPaperToolbar id="header-filter"
                         borderBottom
                         padding={1}>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>

                <div className=""
                     style={{
                         whiteSpace: 'nowrap',
                         display: 'flex'
                     }}>

                    <DocRepoButtonBar />

                </div>

                <div style={{marginLeft: 'auto'}}>

                    <DocRepoFilterBar />

                </div>

            </div>
        </MUIPaperToolbar>

    )
}

export const DocRepoScreen2 = React.memo((props: IProps) => {

    return (

        <FixedNav id="doc-repository">

            <DocRepoScreenRoutedComponents/>

            <RepositoryTour/>
            <header>

                <DeviceRouter.Desktop>
                    <DesktopToolbar/>
                </DeviceRouter.Desktop>

                <MessageBanner/>

            </header>

            <Router/>

            <DeviceRouter handheld={<devices.PhoneAndTablet/>}
                          desktop={<devices.Desktop/>}/>

            <FixedNav.Footer>

                <DeviceRouter.Handheld>
                    <AddContent.Handheld/>
                </DeviceRouter.Handheld>

                <RepoFooter/>
            </FixedNav.Footer>

        </FixedNav>

    )

}, isEqual);



