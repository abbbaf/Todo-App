import {
  Route as MainRouterComponent,
  Switch as MainSwitchComponent,
  Redirect,
} from "react-router-dom";
import { user } from "./services/userService";


function getLabel(component) {
  return component.name.replace(/^./, (m) => m.toLowerCase());
}

function getPath() {
  return document.location.href.match(/(?<![/:])\/.*$/);
}

let initUrl = getPath();

export class Route extends MainRouterComponent {
  static pages = null;

  static getVisible(pages) {
    return pages.filter((page) => !(page.redirectTo && page.redirectTo(user)));
  }

  render() {
    if (initUrl && user) {
      const pathname = getPath()
      try {
        if (initUrl !== pathname) 
          return (
                <Redirect to={{pathname}} />
          );
      } finally {
        initUrl = null;
      }
    }
    const { redirectTo } = this.props;
    if (redirectTo === undefined) return super.render();
    const { component: Component, render, ...rest } = this.props;
    return (
      <MainRouterComponent
        {...rest}
        render={(props) => {
          let pathname = redirectTo(user);
          if (pathname)
            return (
              <Redirect to={{ pathname, state: { from: props.location } }} />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

export class Switch extends MainSwitchComponent {
  render() {
    if (this.props.shouldRender) return super.render();
    Route.pages = {};
    for (let route of this.props.children) {
      const { component, pageName, path, redirectTo } = route.props;
      Route.pages[getLabel(component)] = {
        component,
        pageName,
        path,
        redirectTo,
      };
    }
    return null;
  }
}
