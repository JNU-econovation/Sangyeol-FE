import { createContext } from "react";

import { StackContextType } from "../../types";

const StackContext = createContext<StackContextType | undefined>(undefined);

export default StackContext;
