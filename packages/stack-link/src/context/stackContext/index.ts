import { createContext } from "react";

import { StackContextType } from "@models/index";

const StackContext = createContext<StackContextType | undefined>(undefined);

export default StackContext;
