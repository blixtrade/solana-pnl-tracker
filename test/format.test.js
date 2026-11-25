import test from "node:test";
import assert from "node:assert/strict";
import { sol, usdOf } from "../lib/format.js";

test("usdOf puts the minus sign in front of the dollar sign", () => {
  assert.equal(usdOf(0, 1), " ($0)");
  assert.equal(usdOf(112, 1), " ($112)");
  assert.equal(usdOf(-111, 1), " (-$111)");
  assert.equal(usdOf(1234, 1), " ($1.2K)");
  assert.equal(usdOf(-1234, 1), " (-$1.2K)");
});

test("usdOf matches the case from the issue: -1.546 SOL at $72", () => {
  assert.equal(usdOf(-1.546, 72), " (-$111)");
  assert.equal(usdOf(1.556, 72), " ($112)");
});

test("usdOf returns an empty string when there is no SOL price", () => {
  assert.equal(usdOf(112, null), "");
  assert.equal(usdOf(-111, null), "");
  assert.equal(usdOf(112, undefined), "");
});

test("sol returns a plain signed string, or ? when unknown", () => {
  assert.equal(sol(1.5), "+1.500");
  assert.equal(sol(-1.5), "-1.500");
  assert.equal(sol(0), "+0.000");
  assert.equal(sol(null), "?");
  assert.equal(sol(undefined), "?");
});
