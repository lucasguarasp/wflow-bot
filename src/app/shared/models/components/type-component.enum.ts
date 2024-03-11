export enum TypeComponent {
    StartFlow = "startFlow",
    SubFlow = "subFlow",
    EndFlow = "endFlow",
    GoToFlow = "goToFlow",
    GoToStep = "goToStep",
    Request = "request",
    Response = "response",
    Mapper = "mapper",
    Filter = "filter",
    CallApi = "callApi",
    File = "file",
    Decision = "decision",
    BackToParent = "backToParent",
    Anotation = "anotation"
}

export const icon = new Map<TypeComponent, string>([
    [TypeComponent.StartFlow, 'fa fa-play'],
    [TypeComponent.SubFlow, 'fa fa-play-circle'],
    [TypeComponent.EndFlow, 'fa fa-circle'],
    [TypeComponent.GoToStep, 'fa fa-flag'],
    [TypeComponent.GoToFlow, 'fab fa-telegram'],
    [TypeComponent.Request, 'fas fa-file-signature'],
    [TypeComponent.Response, 'fab fa-google-drive'],
    [TypeComponent.Mapper, 'fas fa-code'],
    [TypeComponent.Filter, 'fa fa-filter'],
    [TypeComponent.CallApi, 'fas fa-code-branch'],
    [TypeComponent.File, 'fa fa-file'],
    [TypeComponent.Decision, 'fa fa-code-fork'],
    [TypeComponent.BackToParent, 'fa fa-refresh'],
    [TypeComponent.Anotation, 'fa fa-comment']
  ]);
  