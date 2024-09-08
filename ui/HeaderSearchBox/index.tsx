import { MagnifyingGlass } from '@phosphor-icons/react';
import * as React from 'react';



export  class HeaderSearchBox extends React.PureComponent<{}, {}> {
    public state = {
    };

    public render() {
        return <div className="search-box rounded-full bg-slate-300 relative  w-full max-w-800 h-12 flex gap-4 items-center p-4">
          <MagnifyingGlass size={20} />
            <input type="text" className="w-full bg-transparent h-full outline-none" autoComplete="off" placeholder="Search"/>
        </div>;
    }
}
