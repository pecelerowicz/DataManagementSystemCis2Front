import { FormBuilder, FormGroup } from "@angular/forms";
import { createProjectDescriptionValidator, createProjectNameValidator } from "../../validators/project_validators/project";

export function getInitialValueCreateProject(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        projectName: ['', {validators: [createProjectNameValidator()]}],
        description: ['', {validators: [createProjectDescriptionValidator()]}]});
}

export function getInitialValueDescription(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        description: [{value: '', disabled: true}, {validators: [createProjectDescriptionValidator()]}]
    })
}