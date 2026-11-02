import * as cdk from 'aws-cdk-lib';
import { resolveStage } from '../lib/site-config';
import { defineStageStacks } from '../lib/stage-stacks';

const app = new cdk.App();
defineStageStacks(app, resolveStage(app, process.env));
