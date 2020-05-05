import * as React from 'react';
import {DocAnnotation} from '../../DocAnnotation';
import isEqual from "react-fast-compare";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Divider from "@material-ui/core/Divider";
import {FlashcardAnnotationControlBar2} from "./FlashcardAnnotationControlBar2";

const RenderFrontAndBackFields = (props: IProps) => {

    const { flashcard } = props;

    return (
        <Card variant="outlined">

            <CardContent>

                <div className="pb-2">

                <span dangerouslySetInnerHTML={{__html: flashcard.fields!.front}}>

                </span>

                </div>

                <Divider/>

                <div className="pt-2">

                <span dangerouslySetInnerHTML={{__html: flashcard.fields!.back}}>

                </span>

                </div>

            </CardContent>

        </Card>
    );

};


const RenderClozeFields = (props: IProps) => {

    const { flashcard } = props;

    return (
        <Card>
            <CardContent>
                <span dangerouslySetInnerHTML={{__html: flashcard.fields!.text}}>
                </span>
            </CardContent>
        </Card>
    );

};

const RenderFields = (props: IProps) => {

    const { flashcard } = props;

    if (flashcard.fields!.text) {
        return (<RenderClozeFields {...props}/>);
    } else {
        return (<RenderFrontAndBackFields {...props}/>);
    }

};


interface IProps {
    readonly flashcard: DocAnnotation;
    readonly editButton: JSX.Element;
    readonly onEdit: () => void;
}

/**
 * A generic wrapper that determines which sub-component to render.
 */
export const FlashcardAnnotationView2 = React.memo((props: IProps) => {

    const { flashcard } = props;

    const key = 'comment-' + flashcard.id;

    return (

        <div key={key} className="mt-1 ml-2">

            <div className="">

                <div onDoubleClick={props.onEdit}>

                    <RenderFields {...props}/>

                </div>

            </div>

            <FlashcardAnnotationControlBar2 flashcard={flashcard}
                                            editButton={props.editButton}
                                            onEdit={props.onEdit}/>

        </div>
    );
}, isEqual);


