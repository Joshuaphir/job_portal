"use client"

import { forwardRef } from "react"
import { Editor, EditorProps } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default forwardRef<Object, EditorProps>(function ReachTextEditor(
    props, ref
){
    return <Editor 
    editorClassName=""
    {...props} />
})