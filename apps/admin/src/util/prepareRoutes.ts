import {globalRoutes} from 'platform';
import {operatorRoutes as coreOperatorRoutes} from 'core-ui';
import {operatorRoutes as merchantOperatorRoutes} from "reaction-merchant-ui";
import {registerOperatorRoutes, registerRoutes} from 'platform/router';

registerRoutes(globalRoutes);
registerOperatorRoutes(coreOperatorRoutes);
registerOperatorRoutes(merchantOperatorRoutes);
