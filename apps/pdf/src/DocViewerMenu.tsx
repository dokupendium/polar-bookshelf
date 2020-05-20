import {MUIMenuItem} from "../../../web/spectron0/material-ui/dropdown_menu/MUIMenuItem";
import * as React from "react";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useDocViewerCallbacks, useDocViewerStore} from "./DocViewerStore";
import {MenuComponentProps} from "../../../web/spectron0/material-ui/doc_repo_table/MUIContextMenu";
import {Elements} from "../../../web/js/util/Elements";
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import {
    IAreaHighlightCreate,
    useAnnotationMutationsContext
} from "../../../web/js/annotation_sidebar/AnnotationMutationsContext";
import {AreaHighlightRenderers} from "./annotations/AreaHighlightRenderers";
import {IPoint} from "../../../web/js/Point";
import {DocMetas} from "../../../web/js/metadata/DocMetas";
import {Logger} from "polar-shared/src/logger/Logger";
import createAreaHighlightFromEvent = AreaHighlightRenderers.createAreaHighlightFromEvent;

const log = Logger.create();

export interface IDocViewerContextMenuOrigin {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly pageNum: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly pointWithinPageElement: IPoint;
}

export function computeDocViewerContextMenuOrigin(event: React.MouseEvent<HTMLElement, MouseEvent>): IDocViewerContextMenuOrigin | undefined {

    const target = event.target as HTMLElement;

    const pageElement = Elements.untilRoot(target, ".page");
    if (! pageElement) {
        return undefined;
    }

    const pageNum = parseInt(pageElement.getAttribute("data-page-number"))

    const eventTargetOffset = Elements.getRelativeOffsetRect(target, pageElement);

    function computePointWithinPageElement(): IPoint {

        const bcr = pageElement.getBoundingClientRect();

        return {
            x: event.clientX - bcr.x,
            y: event.clientY - bcr.y
        };

    }

    const pointWithinPageElement = computePointWithinPageElement();

    return {
        clientX: event.clientX,
        clientY: event.clientY,
        x: eventTargetOffset.left + (event.nativeEvent as any).offsetX,
        y: eventTargetOffset.top + (event.nativeEvent as any).offsetY,
        width: pageElement.clientWidth,
        height: pageElement.clientHeight,
        pointWithinPageElement,
        pageNum
    };

}

export const DocViewerMenu = (props: MenuComponentProps<IDocViewerContextMenuOrigin>) => {

    const {docScale, docMeta} = useDocViewerStore();
    const {onPagemark} = useDocViewerCallbacks();
    const {onAreaHighlight} = useAnnotationMutationsContext();

    const onCreatePagemarkToPoint = React.useCallback(() => {

        if (props.origin) {

            onPagemark({
                type: 'create',
                ...props.origin,
            });

        }

    }, []);

    const onCreateAreaHighlight = React.useCallback(() => {

        async function doAsync() {

            if (props.origin && docScale && docMeta) {

                const point: IPoint = props.origin.pointWithinPageElement;

                const capturedAreaHighlight =
                    await createAreaHighlightFromEvent(props.origin.pageNum,
                                                       point,
                                                       docScale);

                const pageMeta = DocMetas.getPageMeta(docMeta, props.origin.pageNum);

                const mutation: IAreaHighlightCreate = {
                    type: 'create',
                    docMeta,
                    pageMeta,
                    ...capturedAreaHighlight
                };

                onAreaHighlight(mutation);

            }

        }

        // FIXME: better error handling
        doAsync()
            .catch(err => log.error(err));

    }, []);

    return (
        <>
            <MUIMenuItem text="Create Pagemark to Point"
                         icon={<BookmarkIcon/>}
                         onClick={onCreatePagemarkToPoint}/>

            <MUIMenuItem text="Create Area Highlight"
                         icon={<PhotoSizeSelectLargeIcon/>}
                         onClick={onCreateAreaHighlight}/>

        </>
    );

}
