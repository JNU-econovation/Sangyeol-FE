import React from "react";
import { useAppForm } from "./hooks";

// formOptions와 동일한 형태의 타입 정의
type FormConfig<TFormData = any> = {
  defaultValues: TFormData;
  onSubmit: (info: { value: TFormData; formApi: any; meta: any }) => any;
  [key: string]: any; // 다른 옵션들도 허용
};

// useAppForm의 리턴 타입을 실제 구조와 결합
type AppFormApi<TFormData = any> = ReturnType<typeof useAppForm> & {
  // 타입 힌트를 위한 추가 정보
  AppField: <TFieldName extends keyof TFormData>(props: {
    name: TFieldName;
    children: (field: {
      TextAreaField: React.ComponentType<any>;
      AttachmentField: React.ComponentType<any>;
      PositionSelectField: React.ComponentType<any>;
      value: TFormData[TFieldName];
      setValue: (value: TFormData[TFieldName]) => void;
      [key: string]: any;
    }) => React.ReactNode;
  }) => React.ReactElement;
};

// 첫 번째 인자에서 TFormData 타입을 추론
function withAppForm<TFormData = any>(
  config: FormConfig<TFormData>,
  renderFunction: (formProps: AppFormApi<TFormData>) => React.ReactNode,
): React.ComponentType<{}>;

function withAppForm<TFormData = any, TProps extends object = {}>(
  config: FormConfig<TFormData>,
  WrappedComponent: React.ComponentType<TProps & AppFormApi<TFormData>>,
): React.ComponentType<Omit<TProps, keyof AppFormApi<TFormData>>>;

function withAppForm<TFormData = any, TProps extends object = {}>(
  config: FormConfig<TFormData>,
  WrappedComponentOrFunction:
    | React.ComponentType<TProps & AppFormApi<TFormData>>
    | ((formProps: AppFormApi<TFormData>) => React.ReactNode),
): React.ComponentType<any> {
  const WithAppFormComponent = (props: any) => {
    const form = useAppForm(config) as unknown as AppFormApi<TFormData>;

    // 함수인 경우
    if (typeof WrappedComponentOrFunction === "function") {
      const isRenderFunction =
        WrappedComponentOrFunction.length === 1 ||
        (WrappedComponentOrFunction.toString().includes("=>") &&
          !WrappedComponentOrFunction.prototype?.isReactComponent);

      if (isRenderFunction) {
        return (
          WrappedComponentOrFunction as (
            formProps: AppFormApi<TFormData>,
          ) => React.ReactNode
        )(form);
      }
    }

    // 컴포넌트인 경우
    const WrappedComponent = WrappedComponentOrFunction as React.ComponentType<
      TProps & AppFormApi<TFormData>
    >;
    return <WrappedComponent {...props} {...form} />;
  };

  WithAppFormComponent.displayName = `withAppForm(${
    typeof WrappedComponentOrFunction === "function"
      ? WrappedComponentOrFunction.name || "RenderFunction"
      : (WrappedComponentOrFunction as any).displayName ||
        (WrappedComponentOrFunction as any).name
  })`;

  return WithAppFormComponent;
}

export default withAppForm;
