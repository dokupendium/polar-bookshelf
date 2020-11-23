import * as React from 'react';
import {deepMemo} from "../react/ReactUtils";
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '1.5em'
        },
    }),
);

interface IProps {
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: JSX.Element;
}

export const NoteList = deepMemo((props: IProps) => {
    const classes = useStyles();

    return (
        <div className={clsx(props.className, classes.root)}
             style={props.style}>
            {props.children}
        </div>
    )
});