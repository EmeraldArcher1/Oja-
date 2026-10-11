import assert from "node:assert/strict";
import test from "node:test";
import { routeFor } from "./voice-route.ts";

test("sends spoken places to the right page", () => {
  assert.equal(routeFor("open the markets"), "/markets");
  assert.equal(routeFor("I want to sign up"), "/join");
  assert.equal(routeFor("register"), "/join");
  assert.equal(routeFor("read this page"), "read");
  assert.deepEqual(routeFor("take me to stall BA22"), { stall: "BA22" });
  assert.equal(routeFor("something else"), null);
});
