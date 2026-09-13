            class StripeHeroGlobe {
                initArcLinePool() {
                    if (!this.arcLinePoolInitialized) {
                        for (let e = 0; e < this.ARC_LINE_POOL_SIZE; e += 1) {
                            let geometry = new LineGeometry,
                                t = this.ARC_MAX_SEGMENTS + 1,
                                a = new Float32Array(3 * t),
                                i = new Float32Array(3 * t);
                            geometry.setPositions(a), geometry.setColors(i);
                            let r = new v({
                                    transparent: !0,
                                    depthTest: !0,
                                    depthWrite: !0,
                                    linewidth: .007,
                                    vertexColors: !0
                                }),
                                n = this.cachedWidth || this.canvas.clientWidth,
                                o = this.cachedHeight || this.canvas.clientHeight;
                            r.resolution.set(n, o), r.worldUnits = !0, r.opacity = 0, eA(r);
                            let mesh = new Line2(e, r);
                            mesh.computeLineDistances(), mesh.renderOrder = 10, mesh.visible = !1, geometry.instanceCount = 0, this.arcLinePool.push({
                                line: mesh,
                                geometry: geometry,
                                material: material,
                                inUse: !1
                            })
                        }
                        this.arcLinePoolInitialized = !0
                    }
                }
                acquireArcLine() {
                    this.initArcLinePool();
                    let e = this.arcLinePool.find(e => !e.inUse);
                    return e ? (e.inUse = !0, e.line.parent || this.arcsGroup.add(e.line), e) : null
                }
                releaseArcLine(e) {
                    e.inUse = !1, e.line.visible = !1, e.material.opacity = 0, e.geometry.instanceCount = 0, e.material.userData.visibleRange.set(0, 0), e.material.userData.totalSegments = 1, e.material.userData.u_totalSegmentsUniform && (e.material.userData.u_totalSegmentsUniform.value = 1), e.material.userData.shader?.uniforms?.u_totalSegments && (e.material.userData.shader.uniforms.u_totalSegments.value = 1)
                }
                initSimpleArcLinePool() {
                    if (!this.simpleArcLinePoolInitialized) {
                        for (let e = 0; e < this.SIMPLE_ARC_LINE_POOL_SIZE; e += 1) {
                            let geometry = new LineGeometry,
                                t = this.SIMPLE_ARC_MAX_SEGMENTS + 1,
                                a = new Float32Array(3 * t),
                                i = new Float32Array(3 * t);
                            geometry.setPositions(a), geometry.setColors(i);
                            let r = new v({
                                    transparent: !0,
                                    depthTest: !0,
                                    depthWrite: !0,
                                    linewidth: .004,
                                    vertexColors: !0
                                }),
                                n = this.cachedWidth || this.canvas.clientWidth,
                                o = this.cachedHeight || this.canvas.clientHeight;
                            r.resolution.set(n, o), r.worldUnits = !0, r.opacity = 0, eA(r);
                            let mesh = new Line2(e, r);
                            mesh.computeLineDistances(), mesh.renderOrder = 10, mesh.visible = !1, geometry.instanceCount = 0, this.simpleArcLinePool.push({
                                line: s,
                                geometry: e,
                                material: r,
                                inUse: !1
                            })
                        }
                        this.simpleArcLinePoolInitialized = !0
                    }
                }
                acquireSimpleArcLine() {
                    this.initSimpleArcLinePool();
                    let e = this.simpleArcLinePool.find(e => !e.inUse);
                    return e ? (e.inUse = !0, e.line.parent || this.arcsGroup.add(e.line), e) : null
                }
                releaseSimpleArcLine(e) {
                    e.inUse = !1, e.line.visible = !1, e.material.opacity = 0, e.geometry.instanceCount = 0, e.material.userData.visibleRange.set(0, 0), e.material.userData.totalSegments = 1, e.material.userData.u_totalSegmentsUniform && (e.material.userData.u_totalSegmentsUniform.value = 1), e.material.userData.shader?.uniforms?.u_totalSegments && (e.material.userData.shader.uniforms.u_totalSegments.value = 1)
                }
                initMarkerPool() {
                    if (!this.markerPoolInitialized) {
                        for (let e = 0; e < this.MARKER_POOL_SIZE; e += 1) {
                            let e = new d.vBJ({
                                    transparent: !0,
                                    depthWrite: !1,
                                    depthTest: !0
                                }),
                                t = new d.Kj0(this.markerGeometry, e);
                            t.visible = !1, this.markerPool.push({
                                mesh: t,
                                inUse: !1
                            })
                        }
                        this.markerPoolInitialized = !0
                    }
                }
                acquireMarker(e) {
                    this.initMarkerPool();
                    let t = this.markerPool.find(e => !e.inUse);
                    if (t) {
                        t.inUse = !0;
                        let a = this.getOrCreateMarkerTexture(e),
                            i = t.mesh.material;
                        return i.map = a, i.needsUpdate = !0, t.mesh.parent || this.arcsGroup.add(t.mesh), t.mesh
                    }
                    return null
                }
                releaseMarker(e) {
                    let t = this.markerPool.find(t => t.mesh === e);
                    t && (t.inUse = !1, t.mesh.visible = !1)
                }
                initArcPointsPool() {
                    if (this.arcPointsPoolInitialized) return;
                    let e = this.ARC_MAX_SEGMENTS + 1;
                    for (let t = 0; t < this.ARC_LINE_POOL_SIZE; t += 1) {
                        let t = [];
                        for (let a = 0; a < e; a += 1) t.push(new d.Pa4);
                        this.arcPointsPool.push({
                            points: t,
                            inUse: !1
                        })
                    }
                    this.arcPointsPoolInitialized = !0
                }
                acquireArcPoints() {
                    this.initArcPointsPool();
                    let e = this.arcPointsPool.find(e => !e.inUse);
                    return e ? (e.inUse = !0, e) : null
                }
                releaseArcPoints(e) {
                    e.inUse = !1
                }
                initSimpleArcPointsPool() {
                    if (this.simpleArcPointsPoolInitialized) return;
                    let e = this.SIMPLE_ARC_MAX_SEGMENTS + 1;
                    for (let t = 0; t < this.SIMPLE_ARC_LINE_POOL_SIZE; t += 1) {
                        let t = [];
                        for (let a = 0; a < e; a += 1) t.push(new d.Pa4);
                        this.simpleArcPointsPool.push({
                            points: t,
                            inUse: !1
                        })
                    }
                    this.simpleArcPointsPoolInitialized = !0
                }
                acquireSimpleArcPoints() {
                    this.initSimpleArcPointsPool();
                    let e = this.simpleArcPointsPool.find(e => !e.inUse);
                    return e ? (e.inUse = !0, e) : null
                }
                releaseSimpleArcPoints(e) {
                    e.inUse = !1
                }
                getOrCreateMarkerTexture(e) {
                    if (this.markerTextureCache[e]) return this.markerTextureCache[e];
                    let t = this.createMarkerTexture(e);
                    return this.markerTextureCache[e] = t, t
                }
                createMarkerTexture(e) {
                    let t = Math.min(Math.ceil(window.devicePixelRatio || 1), 2),
                        a = new d.Ilk(e),
                        i = e => `rgba(${Math.floor(255*a.r)},${Math.floor(255*a.g)},${Math.floor(255*a.b)},${e})`,
                        r = document.createElement("canvas");
                    r.width = 128 * t, r.height = 128 * t;
                    let n = r.getContext("2d");
                    n.setTransform(t, 0, 0, t, 0, 0), n.clearRect(0, 0, 128, 128), n.fillStyle = i(.25), n.beginPath(), n.arc(64, 64, 64, 0, 2 * Math.PI), n.fill(), n.fillStyle = i(1), n.beginPath(), n.arc(64, 64, 38.4, 0, 2 * Math.PI), n.arc(64, 64, 25.6, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgba(255,255,255,1.0)", n.beginPath(), n.arc(64, 64, 25.6, 0, 2 * Math.PI), n.fill();
                    let o = new d.ROQ(r);
                    return o.needsUpdate = !0, o.generateMipmaps = !0, o.minFilter = d.D1R, o.magFilter = d.wem, o
                }
                findCityByName(e) {
                    return el.find(t => t.name.toLowerCase() === e.toLowerCase()) ?? null
                }
                latLonToVector(e, t, a, i = this.radius) {
                    let r = e * Math.PI / 180,
                        n = -t * Math.PI / 180,
                        o = i * Math.cos(r) * Math.cos(n),
                        s = i * Math.sin(r),
                        l = i * Math.cos(r) * Math.sin(n);
                    return a.set(o, s, l)
                }
                cityToVector(e, t, a = this.radius) {
                    return void 0 !== e.ux && void 0 !== e.uy && void 0 !== e.uz ? t.set(e.ux * a, e.uy * a, e.uz * a) : this.latLonToVector(e.lat, e.lon, t, a)
                }
                getCityDistanceKm(e, t) {
                    let a = d.M8C.degToRad(e.lat),
                        i = d.M8C.degToRad(e.lon),
                        r = d.M8C.degToRad(t.lat),
                        n = d.M8C.degToRad(t.lon),
                        o = r - a,
                        s = n - i,
                        l = Math.sin(o / 2) * Math.sin(o / 2) + Math.cos(a) * Math.cos(r) * Math.sin(s / 2) * Math.sin(s / 2);
                    return 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)) * 6371
                }
                getVisibleCityIndices(e = this.arcVisibleCityDotThreshold) {
                    if (this.visibleCityIndicesCache.length = 0, !this.globeGroup || !this.camera) return this.visibleCityIndicesCache;
                    let t = d.M8C.clamp(e, -1, 1),
                        a = this.tempVecA;
                    this.globeGroup.getWorldPosition(a);
                    let i = this.tempVecB.copy(this.camera.position).sub(a).normalize(),
                        r = this.tempVecD,
                        n = this.arcsGroup?.matrixWorld ?? this.globeGroup.matrixWorld,
                        o = 1 - 2 * this.arcRightEdgeExclusionRatio;
                    for (let e = 0; e < this.cityVectors.length; e += 1) {
                        r.copy(this.cityVectors[e]), r.applyMatrix4(n);
                        let s = this.tempVecC.copy(r).sub(a);
                        s.lengthSq() > 1e-6 && (s.normalize(), s.dot(i) >= t && this.tempVecE.copy(r).project(this.camera).x < o && this.visibleCityIndicesCache.push(e))
                    }
                    return this.visibleCityIndicesCache
                }
                createArcUIElement() {
                    return document.createElement("div")
                }
                acquireFlagElement(e) {
                    let t = this.flagPool?.find(e => !this.activeArcs.some(t => t.flagStartElement === e || t.flagEndElement === e)) ?? null;
                    return t ? (this.renderFlagContent?.(t, e), t) : null
                }
                computeProjection(e, t, a, i, r) {
                    let n = this.tempVecE.copy(e);
                    n.project(this.camera);
                    let o = this.tempVecF.copy(e).sub(t).normalize().dot(a);
                    return this._proj.x = (.5 * n.x + .5) * i, this._proj.y = (-(.5 * n.y) + .5) * r, this._proj.isOffscreen = n.x < -1.1 || n.x > 1.1 || n.y < -1.1 || n.y > 1.1, this._proj.isBehindGlobe = o < er.ARC_UI_HIDE_DOT_THRESHOLD, this._proj.depthFade = o <= -.1 ? d.M8C.smoothstep(o, -.35, -.1) : 1, this._proj
                }
                updateFlagOverlayPosition(e, t, a, i, r, n, o) {
                    if (o <= .001) {
                        e.style.display = "none";
                        return
                    }
                    let s = this.tempVecD.copy(t).applyMatrix4(this.arcsGroup.matrixWorld),
                        {
                            x: l,
                            y: c,
                            isOffscreen: u,
                            isBehindGlobe: h,
                            depthFade: d
                        } = this.computeProjection(s, a, i, r, n);
                    if (u || h) {
                        e.style.display = "none";
                        return
                    }
                    e.style.display = "", e.style.setProperty("--ui-x", `${l.toFixed(2)}px`), e.style.setProperty("--ui-y", `${c.toFixed(2)}px`), e.style.setProperty("--ui-opacity", (o * d).toFixed(3))
                }
                updateSingleArcFlagOverlays(e, t, a, i, r) {
                    let n;
                    n = "done" === e.uiState ? 0 : "outro" === e.uiState ? e.uiOpacity : 1, e.flagStartElement && this.updateFlagOverlayPosition(e.flagStartElement, e.startMarker.position, t, a, i, r, e.markerAOpacity * n), e.flagEndElement && this.updateFlagOverlayPosition(e.flagEndElement, e.endMarker.position, t, a, i, r, e.markerBOpacity * n)
                }
                updateUIElementContent(e, t, a, i) {
                    if ("flags" === this.uiVariant) {
                        let t = e.querySelector(".globe__arc-flag-ui-currency");
                        t && (t.textContent = i);
                        return
                    }
                    let r = e.querySelector(".globe__arc-ui-icon"),
                        n = e.querySelector(".globe__arc-ui-amount"),
                        o = e.querySelector(".globe__arc-ui-currency");
                    if (r) {
                        r.style.display = "";
                        let e = ey[t % ey.length];
                        eP += 1;
                        let a = e.template.replaceAll("-UID", `-${eP}`),
                            i = new DOMParser().parseFromString(a, "image/svg+xml").documentElement;
                        r.replaceChildren(i)
                    }
                    n && (n.style.display = "", n.textContent = `$${a}`), o && (o.textContent = i)
                }
                getRandomUIData(e) {
                    let t = Math.floor(Math.random() * ev.length),
                        a = "Phantom" === ev[t].name;
                    return {
                        walletIndex: t,
                        amount: Math.floor(999 * Math.random()) + 1,
                        currencyLabel: "flags" === this.uiVariant && e ? eM[e] ?? "USD" : a ? "CASH" : eS[Math.floor(Math.random() * eS.length)]
                    }
                }
                updateArcsConsolidated(e) {
                    let t = this.tempVecA;
                    this.globeGroup.getWorldPosition(t);
                    let a = this.tempVecC.copy(this.camera.position).sub(t).normalize(),
                        i = this.cachedWidth,
                        r = this.cachedHeight,
                        n = i > 0 && r > 0;
                    for (let o = this.activeArcs.length - 1; o >= 0; o -= 1) {
                        let s = this.activeArcs[o];
                        this.updateSingleArcAnimation(s, e), "flags" === this.uiVariant && s.lineProgress >= .999 && "idle" === s.finalizeState && this.startArcFinalization(s, e), n && s.uiElement && this.updateSingleArcUIPosition(s, t, a, i, r), n && "flags" === this.uiVariant && this.updateSingleArcFlagOverlays(s, t, a, i, r), "done" === s.finalizeState && "done" === s.uiState && (this.disposeArcResources(s), this.activeArcs.splice(o, 1))
                    }
                }
                updateSingleArcAnimation(e, t) {
                    let {
                        markerA: a,
                        markerB: i,
                        line: r,
                        startTime: n,
                        markerAEasing: o,
                        markerBEasing: s,
                        lineEasing: l
                    } = e.animation, c = Math.max(0, t - n), {
                        x: u,
                        y: h
                    } = this.getArcFinalizationFactors(e, t), p = r <= 0 ? 1 : d.M8C.clamp(Math.max(0, c - a - i) / r, 0, 1), m = (0, Y.Ri)(a <= 0 ? 1 : Math.min(1, c / a), o);
                    e.startMarker.material.opacity = m * u, e.markerAOpacity = m * u, e.startMarker.scale.setScalar(Math.max(1e-4, e.markerScale * m * u));
                    let f = c >= a ? (0, Y.Ri)(i <= 0 ? 1 : Math.min(1, Math.max(0, c - a) / i), s) : 0;
                    e.endMarker.material.opacity = f * u, e.markerBOpacity = f * u, e.endMarker.scale.setScalar(Math.max(1e-4, e.markerScale * f * u));
                    let g = e.mesh.material,
                        v = (0, Y.Ri)(p, l),
                        y = 0;
                    if ("idle" !== e.finalizeState && (y = h), g.userData.visibleRange.set(y, v), g.userData.totalSegments = e.lineSegmentCount, g.userData.u_totalSegmentsUniform && (g.userData.u_totalSegmentsUniform.value = e.lineSegmentCount), g.userData.shader?.uniforms?.u_totalSegments && (g.userData.shader.uniforms.u_totalSegments.value = e.lineSegmentCount), e.linePoolItem) {
                        let t = e.linePoolItem.geometry;
                        t.instanceCount !== e.lineSegmentCount && (t.instanceCount = e.lineSegmentCount)
                    }
                    if (h > 1e-4 && e.lineProgress >= .999 && "idle" !== e.finalizeState) {
                        let t = Math.max(0, 1 - h);
                        y >= v || t <= .001 ? (e.mesh.visible = !1, g.opacity = 0) : (e.mesh.visible = !0, g.opacity = t)
                    } else p <= 0 ? (e.mesh.visible = !1, g.opacity = 0) : (e.mesh.visible = !0, g.opacity = v);
                    e.lineProgress = p, this.updateArcUIState(e, t)
                }
                updateSingleArcUIPosition(e, t, a, i, r) {
                    if (!e.uiElement) return;
                    let n = d.M8C.clamp(e.uiTravelProgress ?? .5, 0, 1),
                        o = this.getPointOnArc(e, n, this.tempVecK),
                        s = this.tempVecI.copy(o).normalize(),
                        l = Math.max(0, o.length() - this.radius),
                        c = d.M8C.clamp(l / (.75 * this.radius), 0, 1),
                        u = d.M8C.lerp(er.ARC_UI_MIN_OFFSET, er.ARC_UI_MAX_OFFSET, c),
                        h = this.tempVecJ.copy(o).add(s.multiplyScalar(u));
                    h.applyMatrix4(this.arcsGroup.matrixWorld);
                    let {
                        x: p,
                        y: m,
                        isOffscreen: f,
                        isBehindGlobe: g,
                        depthFade: v
                    } = this.computeProjection(h, t, a, i, r), y = g || f;
                    e.uiHideFade = d.M8C.lerp(e.uiHideFade, y ? 1 : 0, y ? .25 : .15);
                    let S = d.M8C.clamp(e.uiOpacity ?? 0, 0, 1) * v * (1 - e.uiHideFade);
                    if (S > .001) {
                        let t = d.M8C.lerp(er.ARC_UI_MIN_SCALE, er.ARC_UI_MAX_SCALE, c),
                            a = d.M8C.clamp(e.uiScaleValue ?? 0, 0, 1),
                            i = 0;
                        if ("intro" === e.uiState) i = d.M8C.lerp(0, t, a);
                        else if ("travel" === e.uiState) i = t;
                        else if ("outro" === e.uiState) {
                            let r = e.uiOutroStartScale > 0 ? e.uiOutroStartScale : t;
                            i = d.M8C.lerp(r, 0, a)
                        } else "done" === e.uiState && (i = 0);
                        let r = e.uiElement.style,
                            n = Math.round(p),
                            o = Math.round(m);
                        (void 0 === e.uiLastX || void 0 === e.uiLastY || Math.abs(n - (e.uiLastX ?? 0)) >= 1 || Math.abs(o - (e.uiLastY ?? 0)) >= 1) && (r.setProperty("--ui-x", `${n}px`), r.setProperty("--ui-y", `${o}px`), e.uiLastX = n, e.uiLastY = o), e.uiCurrentScale !== i && r.setProperty("--ui-scale", i.toFixed(3)), r.setProperty("--ui-opacity", S.toFixed(3)), "none" === r.display && (r.display = "block"), e.uiCurrentScale = i
                    } else e.uiElement.style.display = "none"
                }
                startArcFinalization(e, t) {
                    "idle" === e.finalizeState && (e.finalizeState = "active", e.finalizeStartTime = t)
                }
                getArcFinalizationFactors(e, t) {
                    if ("done" === e.finalizeState) return e.lineRetreatProgress = 1, e.markerFadeProgress = 1, this.tempArcFactors.set(0, 1);
                    if ("active" !== e.finalizeState) return this.tempArcFactors.set(1, 0);
                    let a = Math.max(0, t - e.finalizeStartTime),
                        i = Math.max(100, e.lineRetreatDuration),
                        r = d.M8C.clamp(a / i, 0, 1),
                        n = (0, Y.Ri)(r, e.lineRetreatEasing);
                    e.lineRetreatProgress = n;
                    let o = Math.max(50, e.markerFadeDuration),
                        s = d.M8C.clamp(Math.max(0, a - .8 * i) / o, 0, 1),
                        l = (0, Y.Ri)(s, e.markerFadeEasing);
                    return e.markerFadeProgress = l, n >= 1 && l >= 1 && (e.finalizeState = "done"), this.tempArcFactors.set(Math.max(0, 1 - l), d.M8C.clamp(n, 0, 1))
                }
                getPointOnArc(e, t, a) {
                    if (!e.points.length) return a.set(0, 0, 0);
                    if (!e.totalLineLength || e.totalLineLength <= 0) return a.copy(e.points[e.points.length - 1]);
                    let i = e.pointDistances,
                        r = d.M8C.clamp(t, 0, 1) * e.totalLineLength;
                    for (let t = 1; t < i.length; t += 1)
                        if (r <= i[t]) {
                            let n = e.points[t - 1],
                                o = e.points[t],
                                s = i[t] - i[t - 1],
                                l = s <= 1e-5 ? 0 : (r - i[t - 1]) / s;
                            return a.copy(n).lerp(o, l)
                        } return a.copy(e.points[e.points.length - 1])
                }
                disposeArcResources(e) {
                    e.linePoolItem && (e.isSimpleArc ? this.releaseSimpleArcLine(e.linePoolItem) : this.releaseArcLine(e.linePoolItem)), e.pointsPoolItem && (e.isSimpleArc ? this.releaseSimpleArcPoints(e.pointsPoolItem) : this.releaseArcPoints(e.pointsPoolItem)), e.startMarker && this.releaseMarker(e.startMarker), e.endMarker && this.releaseMarker(e.endMarker), e.uiElement && (e.uiElement.style.display = "none"), e.flagStartElement && (e.flagStartElement.style.display = "none"), e.flagEndElement && (e.flagEndElement.style.display = "none")
                }
                updateArcController(e) {
                    if (!this.arcControllerEnabled || el.length < 2 || (0 === this.arcControllerNextSpawnTime && (this.arcControllerNextSpawnTime = e), e < this.arcControllerNextSpawnTime)) return;
                    if (this.activeArcs.length >= this.arcControllerMaxActive) {
                        this.arcControllerNextSpawnTime = e + 250;
                        return
                    }
                    let t = !1;
                    for (let a = 0; a < 2 && !t; a += 1) t = this.spawnRandomCityArc(e);
                    t ? this.scheduleNextArcSpawn(e) : this.arcControllerNextSpawnTime = e + 200
                }
                scheduleNextArcSpawn(e) {
                    let t = Math.max(0, Math.floor(this.arcSpawnIntervalMin)),
                        a = Math.max(t, Math.floor(this.arcSpawnIntervalMax)),
                        i = t === a ? t : d.M8C.randInt(t, a);
                    this.arcControllerNextSpawnTime = e + Math.max(100, i)
                }
                spawnRandomCityArc(e) {
                    let t = this.pickRandomCityPair();
                    if (!t) return !1;
                    let a = this.arcColorPalettes.length > 0 ? this.arcColorPalettes[Math.floor(Math.random() * this.arcColorPalettes.length)] : {
                            start: 16736162,
                            end: 8042751
                        },
                        i = this.drawArc({
                            from: t.from,
                            to: t.to,
                            colorStart: a.start,
                            colorEnd: a.end,
                            currentTime: e
                        });
                    return i && this.updateSingleArcAnimation(i, e), !!i
                }
                updateSimpleArcController(e) {
                    if (!this.simpleArcControllerEnabled || el.length < 2 || (0 === this.simpleArcControllerNextSpawnTime && (this.simpleArcControllerNextSpawnTime = e), e < this.simpleArcControllerNextSpawnTime)) return;
                    let t = 0;
                    for (let e of this.activeSimpleArcs) "done" !== e.finalizeState && (t += 1);
                    if (t >= this.simpleArcMaxActive) {
                        this.simpleArcControllerNextSpawnTime = e + 150;
                        return
                    }
                    let a = !1;
                    for (let t = 0; t < 2 && !a; t += 1) a = this.spawnSimpleArc(e);
                    a ? this.scheduleNextSimpleArcSpawn(e) : this.simpleArcControllerNextSpawnTime = e + 150
                }
                scheduleNextSimpleArcSpawn(e) {
                    let t = Math.max(0, Math.floor(this.simpleArcSpawnIntervalMin)),
                        a = Math.max(t, Math.floor(this.simpleArcSpawnIntervalMax)),
                        i = t === a ? t : d.M8C.randInt(t, a);
                    this.simpleArcControllerNextSpawnTime = e + Math.max(50, i)
                }
                spawnSimpleArc(e) {
                    let t = this.pickSimpleArcCityPair();
                    if (!t) return !1;
                    let a = this.simpleArcColorPalettes.length > 0 ? this.simpleArcColorPalettes[Math.floor(Math.random() * this.simpleArcColorPalettes.length)] : {
                            start: 8443135,
                            end: 5089023
                        },
                        i = this.drawSimpleArc({
                            from: t.from,
                            to: t.to,
                            colorStart: a.start,
                            colorEnd: a.end,
                            currentTime: e
                        });
                    return !!i && (this.activeSimpleArcs.push(i), this.updateSingleArcAnimation(i, e), !0)
                }
                getActiveUIArcCityNames() {
                    let e = new Set;
                    for (let t of this.activeArcs) t.uiElement && (t.fromCityName && e.add(t.fromCityName), t.toCityName && e.add(t.toCityName));
                    return e
                }
                pickSimpleArcCityPair() {
                    let e = this.candidateCityIndices,
                        t = e.length;
                    if (t < 2) return null;
                    let a = this.getActiveUIArcCityNames(),
                        i = this.simpleArcMinDistanceKm,
                        r = this.simpleArcMaxDistanceKm;
                    for (let n = 0; n < 30; n += 1) {
                        let n = e[Math.floor(Math.random() * t)],
                            o = e[Math.floor(Math.random() * t)],
                            s = 0;
                        for (; o === n && s < 10;) o = e[Math.floor(Math.random() * t)], s += 1;
                        if (o !== n) {
                            let e = el[n],
                                t = el[o];
                            if (e && t && !a.has(e.name) && !a.has(t.name)) {
                                let a = `${e.name}-${t.name}`;
                                if (a !== this.lastSimpleArcPairKey) {
                                    let n = this.getCityDistanceKm(e, t);
                                    if (n >= i && n <= r) return this.lastSimpleArcPairKey = a, {
                                        from: e,
                                        to: t
                                    }
                                }
                            }
                        }
                    }
                    return null
                }
                drawSimpleArc(e) {
                    let {
                        from: t,
                        to: a,
                        colorStart: i = 8443135,
                        colorEnd: r = 5089023,
                        currentTime: n
                    } = e, o = this.cityToVector(t, this.arcTempP0), s = this.cityToVector(a, this.arcTempP3), l = this.arcTempU0Orig.copy(o).normalize(), c = this.arcTempU3Orig.copy(s).normalize(), u = this.arcTempChordDir.copy(s).sub(o), h = this.arcTempTangentStart.copy(u).addScaledVector(l, -u.dot(l)).normalize(), p = this.arcTempTangentEnd.copy(u).addScaledVector(c, -u.dot(c)).normalize(), m = this.arcTempP0Final.copy(o).addScaledVector(h, er.MARKER_TANGENT_OFFSET);
                    m.normalize().multiplyScalar(this.radius);
                    let f = this.arcTempP3Final.copy(s).addScaledVector(p, -er.MARKER_TANGENT_OFFSET);
                    f.normalize().multiplyScalar(this.radius);
                    let g = this.arcTempU0.copy(m).normalize(),
                        v = this.arcTempU3.copy(f).normalize(),
                        y = Math.acos(d.M8C.clamp(g.dot(v), -1, 1)),
                        S = d.M8C.clamp(y / Math.PI, 0, 1),
                        M = d.M8C.clamp(S, 0, 1) ** 1,
                        A = d.M8C.lerp(.06, .18, M) * this.radius,
                        P = Math.sin(y),
                        b = this.SIMPLE_ARC_MAX_SEGMENTS,
                        w = this.acquireSimpleArcPoints();
                    if (!w) return;
                    let {
                        points: _
                    } = w;
                    for (let e = 0; e <= b; e += 1) {
                        let t = e / b,
                            a = this.arcTempDir;
                        if (P > 1e-6) {
                            let e = Math.sin((1 - t) * y) / P,
                                i = Math.sin(t * y) / P;
                            a.copy(g).multiplyScalar(e).addScaledVector(v, i).normalize()
                        } else a.copy(g).lerp(v, t).normalize();
                        let i = Math.sin(Math.PI * t) * A;
                        _[e].set(a.x * (this.radius + i), a.y * (this.radius + i), a.z * (this.radius + i))
                    }
                    this.arcPointDistancesPool.length = 0, this.arcPointDistancesPool.push(0);
                    let C = 0;
                    for (let e = 1; e < _.length; e += 1) C += _[e].distanceTo(_[e - 1]), this.arcPointDistancesPool.push(C);
                    this.arcLinePositionsPool.length = 0, this.arcLineColorsPool.length = 0;
                    let x = this.arcColorA.setHex(i),
                        E = this.arcColorB.setHex(r),
                        T = _.length;
                    for (let e = 0; e < T; e += 1) {
                        let t = _[e];
                        this.arcLinePositionsPool.push(t.x, t.y, t.z);
                        let a = e / Math.max(1, T - 1);
                        this.arcColorTemp.copy(x).lerp(E, a), this.arcLineColorsPool.push(this.arcColorTemp.r, this.arcColorTemp.g, this.arcColorTemp.b)
                    }
                    let z = this.arcLinePositionsPool.slice(),
                        U = this.arcLineColorsPool.slice(),
                        D = this.arcPointDistancesPool.slice(),
                        I = this.acquireSimpleArcLine();
                    if (!I) {
                        this.releaseSimpleArcPoints(w);
                        return
                    }
                    let {
                        line: k,
                        geometry: R,
                        material: G
                    } = I;
                    R.setPositions(z), R.setColors(U);
                    let F = this.cachedWidth || this.canvas.clientWidth,
                        O = this.cachedHeight || this.canvas.clientHeight;
                    G.resolution.set(F, O), G.opacity = 0, k.computeLineDistances();
                    let L = Math.max(1, _.length - 1);
                    R.instanceCount = L, k.visible = !1, G.userData.totalSegments = L, G.userData.visibleRange.set(0, 0), G.userData.u_totalSegmentsUniform && (G.userData.u_totalSegmentsUniform.value = L), G.userData.shader?.uniforms?.u_totalSegments && (G.userData.shader.uniforms.u_totalSegments.value = L);
                    let N = this.acquireMarker(i),
                        B = this.acquireMarker(r);
                    if (!N || !B) {
                        this.releaseSimpleArcLine(I), this.releaseSimpleArcPoints(w), N && this.releaseMarker(N), B && this.releaseMarker(B);
                        return
                    }
                    let V = this.arcTempTangent.copy(o).normalize(),
                        H = this.arcTempForward.copy(s).normalize();
                    N.position.copy(o), N.scale.setScalar(.01), N.visible = !0, this.arcTempQuat.setFromUnitVectors(this.tempVecA.set(0, 0, 1), V), N.quaternion.copy(this.arcTempQuat);
                    let K = N.material;
                    K.opacity = 0, K.transparent = !0, B.position.copy(s), B.scale.setScalar(.01), B.visible = !0, this.arcTempQuat.setFromUnitVectors(this.tempVecA.set(0, 0, 1), H), B.quaternion.copy(this.arcTempQuat);
                    let W = B.material;
                    W.opacity = 0, W.transparent = !0;
                    let j = n ?? performance.now();
                    return {
                        mesh: k,
                        points: _,
                        linePositions: z,
                        lineColors: U,
                        startMarker: N,
                        endMarker: B,
                        uiElement: null,
                        start: j,
                        duration: 1 / 0,
                        markerScale: .12,
                        animation: {
                            startTime: j,
                            markerA: eo.markerA.durationMs,
                            markerB: eo.markerB.durationMs,
                            line: eo.line.durationMs,
                            markerAEasing: eo.markerA.easing,
                            markerBEasing: eo.markerB.easing,
                            lineEasing: eo.line.easing
                        },
                        lineSegmentCount: L,
                        lineProgress: 0,
                        pointDistances: D,
                        totalLineLength: C,
                        arcDistanceKm: this.getCityDistanceKm(t, a),
                        uiState: "done",
                        uiStartTime: 0,
                        uiIntroDuration: 0,
                        uiTravelDuration: 0,
                        uiOutroDuration: 0,
                        uiIntroEasing: "easeOutCubic",
                        uiTravelEasing: "easeInOutCubic",
                        uiOutroEasing: "easeInCubic",
                        uiOpacity: 0,
                        uiScaleValue: 0,
                        uiTravelProgress: 0,
                        uiTravelStartT: 0,
                        uiTravelEndT: 1,
                        uiCurrentScale: 0,
                        uiOutroStartScale: 0,
                        uiHideFade: 0,
                        finalizeState: "idle",
                        finalizeStartTime: 0,
                        lineRetreatDuration: eo.lineRetreat.durationMs,
                        markerFadeDuration: eo.markerFade.durationMs,
                        lineRetreatEasing: eo.lineRetreat.easing,
                        markerFadeEasing: eo.markerFade.easing,
                        lineRetreatProgress: 0,
                        markerFadeProgress: 0,
                        colorStart: new d.Ilk(i),
                        colorEnd: new d.Ilk(r),
                        uiWalletIndex: 0,
                        uiAmount: 0,
                        uiCurrencyLabel: "",
                        linePoolItem: I,
                        pointsPoolItem: w,
                        isSimpleArc: !0,
                        fromCityName: t.name ?? "",
                        toCityName: a.name ?? "",
                        flagStartElement: null,
                        flagEndElement: null,
                        markerAOpacity: 0,
                        markerBOpacity: 0
                    }
                }
                updateSimpleArcsConsolidated(e) {
                    for (let t = this.activeSimpleArcs.length - 1; t >= 0; t -= 1) {
                        let a = this.activeSimpleArcs[t];
                        this.updateSingleArcAnimation(a, e), a.lineProgress >= .999 && "idle" === a.finalizeState && this.startArcFinalization(a, e), "done" === a.finalizeState && (this.disposeArcResources(a), this.activeSimpleArcs.splice(t, 1))
                    }
                }
                checkArcSpawnDistance(e, t) {
                    if (0 === this.activeArcs.length) return !0;
                    let a = this.arcMinUIScreenDistance;
                    if (a <= 0) return !0;
                    let i = this.cityToVector(e, this.tempVecA),
                        r = this.cityToVector(t, this.tempVecB),
                        n = this.tempVecC.copy(i).lerp(r, .5).normalize();
                    n.multiplyScalar(1.1 * this.radius), this.arcsGroup && n.applyMatrix4(this.arcsGroup.matrixWorld);
                    let o = this.tempVecD.copy(n);
                    o.project(this.camera);
                    let s = this.cachedWidth,
                        l = this.cachedHeight;
                    if (0 === s || 0 === l) return !0;
                    let c = (.5 * o.x + .5) * s,
                        u = (-(.5 * o.y) + .5) * l;
                    if (o.z > 1 || o.x < -1.2 || o.x > 1.2 || o.y < -1.2 || o.y > 1.2) return !0;
                    for (let e = 0; e < this.activeArcs.length; e += 1) {
                        let t = this.activeArcs[e];
                        if ("done" !== t.uiState && "outro" !== t.uiState) {
                            if (void 0 !== t.uiLastX && void 0 !== t.uiLastY) {
                                let e = c - t.uiLastX,
                                    i = u - t.uiLastY;
                                if (Math.sqrt(e * e + i * i) < a) return !1
                            }
                            let e = this.tempVecE.copy(t.startMarker.position);
                            e.applyMatrix4(this.arcsGroup.matrixWorld);
                            let i = this.tempVecF.copy(e).project(this.camera),
                                r = (.5 * i.x + .5) * s,
                                n = (-(.5 * i.y) + .5) * l,
                                o = this.tempVecG.copy(t.endMarker.position);
                            o.applyMatrix4(this.arcsGroup.matrixWorld);
                            let h = this.tempVecH.copy(o).project(this.camera),
                                d = (.5 * h.x + .5) * s,
                                p = (-(.5 * h.y) + .5) * l,
                                m = .7 * a,
                                f = c - r,
                                g = u - n;
                            if (Math.sqrt(f * f + g * g) < m) return !1;
                            let v = c - d,
                                y = u - p;
                            if (Math.sqrt(v * v + y * y) < m) return !1
                        }
                    }
                    return !0
                }
                getViewedLongitude() {
                    if (!this.globeGroup) return 0;
                    let e = this.globeGroup.rotation.y % (2 * Math.PI);
                    return e > Math.PI && (e -= 2 * Math.PI), e < -Math.PI && (e += 2 * Math.PI), -(180 / Math.PI * e)
                }
                isLongitudeInPacific(e, t, a) {
                    return e <= t || e >= a
                }
                isPacificOceanVisible() {
                    let e = this.getViewedLongitude();
                    return this.isLongitudeInPacific(e, this.arcPacificWestBoundary, this.arcPacificEastBoundary)
                }
                isPacificForSpeedAcceleration() {
                    let e = this.getViewedLongitude();
                    return this.isLongitudeInPacific(e, this.arcPacificSpeedWestBoundary, this.arcPacificSpeedEastBoundary)
                }
                hasActiveTranspacificArc() {
                    for (let e of this.activeArcs) {
                        let t = e.startMarker.position,
                            a = e.endMarker.position,
                            i = Math.atan2(t.x, t.z) * (180 / Math.PI),
                            r = Math.atan2(a.x, a.z) * (180 / Math.PI),
                            n = i < -100,
                            o = i > 100,
                            s = r < -100,
                            l = r > 100;
                        if (n && l || o && s) return !0
                    }
                    return !1
                }
                pickTranspacificPair() {
                    for (let e of [...eg].sort(() => Math.random() - .5)) {
                        let t = this.findCityByName(e.from),
                            a = this.findCityByName(e.to);
                        if (t && a) {
                            .5 > Math.random() && ([t, a] = [a, t]);
                            let e = `${t.name}-${a.name}`,
                                i = `${a.name}-${t.name}`;
                            if (e !== this.lastArcPairKey && i !== this.lastArcPairKey && this.checkArcSpawnDistance(t, a)) return {
                                from: t,
                                to: a
                            }
                        }
                    }
                    return null
                }
                pickRandomCityPair() {
                    let e = this.candidateCityIndices,
                        t = e.length;
                    if (t < 2) return null;
                    if ("flags" !== this.uiVariant && this.arcPreferTranspacific && this.isPacificOceanVisible() && !this.hasActiveTranspacificArc()) {
                        let e = this.pickTranspacificPair();
                        if (e) {
                            let t = `${e.from.name}-${e.to.name}`;
                            return this.lastArcPairKey = t, e
                        }
                    }
                    let a = Math.max(0, this.arcCityMinDistanceKm),
                        i = Math.max(20, 4 * t),
                        r = this.arcMaxSpawnDistanceAttempts,
                        n = null,
                        o = -1 / 0,
                        s = !1,
                        l = this.getVisibleCityIndices(),
                        c = new Set(l),
                        u = e,
                        h = e;
                    if ("flags" === this.uiVariant) {
                        let t = e.filter(e => ep.has(el[e].country)),
                            a = e.filter(e => em.has(el[e].country));
                        if (l.length > 0 ? (u = t.filter(e => c.has(e)), h = a.filter(e => c.has(e))) : (u = t, h = a), 0 === u.length || 0 === h.length) return null
                    } else if (l.length > 0) {
                        let t = e.length < el.length ? l.filter(e => c.has(e)) : l;
                        t.length > 0 && (.5 > Math.random() ? u = t : h = t)
                    }
                    let d = [];
                    if ("flags" === this.uiVariant) {
                        let e = Object.keys(eu),
                            t = new Map;
                        for (let a of u) {
                            let {
                                country: i
                            } = el[a], r = e.find(e => eu[e].includes(i));
                            if (r) {
                                let e = t.get(r) ?? [];
                                e.push(a), t.set(r, e)
                            }
                        }
                        d = [...t.values()]
                    }
                    let p = null;
                    if ("flags" === this.uiVariant)
                        for (let e of (p = new Map, ep)) p.set(e, h.filter(t => el[t].country !== e && ed.has(`${e}->${el[t].country}`)));
                    let m = 0;
                    for (let e = 0; e < i; e += 1) {
                        let e;
                        if ("flags" === this.uiVariant && d.length > 0) {
                            let t = d[Math.floor(Math.random() * d.length)];
                            e = t[Math.floor(Math.random() * t.length)]
                        } else e = u[Math.floor(Math.random() * u.length)];
                        let i = h;
                        if (null !== p) {
                            let t = el[e]?.country;
                            t && (i = p.get(t) ?? h)
                        }
                        let l = i[Math.floor(Math.random() * i.length)],
                            c = 0;
                        for (; l === e && c < i.length + 5;) l = i[Math.floor(Math.random() * i.length)], c += 1;
                        if (l !== e) {
                            let i = el[e],
                                c = el[l];
                            if (i && c && i !== c) {
                                let e = `${i.name}-${c.name}`;
                                if (!(e === this.lastArcPairKey && t > 2)) {
                                    let t = this.getCityDistanceKm(i, c);
                                    if (this.checkArcSpawnDistance(i, c)) {
                                        if ((t > o || !s) && (o = t, n = {
                                                from: i,
                                                to: c
                                            }, s = !0), t >= a) return this.lastArcPairKey = e, {
                                            from: i,
                                            to: c
                                        }
                                    } else m += 1, !s && t > o && (o = t, n = {
                                        from: i,
                                        to: c
                                    });
                                    if (m >= r && !s && n && t >= a) return this.lastArcPairKey = e, {
                                        from: i,
                                        to: c
                                    }
                                }
                            }
                        }
                    }
                    if (n) {
                        if ("flags" === this.uiVariant) {
                            let e = el.indexOf(n.from),
                                t = el.indexOf(n.to),
                                a = this.getVisibleCityIndices();
                            if (!a.includes(e) || !a.includes(t)) return null
                        }
                        let e = `${n.from.name}-${n.to.name}`;
                        return this.lastArcPairKey = e, n
                    }
                    return null
                }
                updateArcUIState(e, t) {
                    if ("done" === e.uiState) {
                        e.uiOpacity = 0, e.uiScaleValue = 0;
                        return
                    }
                    if ("flags" === this.uiVariant) {
                        e.uiOpacity = 0, e.uiScaleValue = 0, "done" === e.finalizeState && (e.uiState = "done");
                        return
                    }
                    if ("idle" === e.uiState) {
                        e.uiOpacity = 0, e.uiScaleValue = 0, e.uiTravelProgress = e.uiTravelStartT, e.lineProgress >= 1 && (e.uiState = "intro", e.uiStartTime = t, e.uiScaleValue = 0);
                        return
                    }
                    if ("intro" === e.uiState) {
                        let a = Math.max(1, e.uiIntroDuration),
                            i = (t - e.uiStartTime) / a,
                            r = (0, Y.Ri)(i, e.uiIntroEasing);
                        e.uiOpacity = r, e.uiScaleValue = r, e.uiTravelProgress = e.uiTravelStartT, i >= 1 && (e.uiState = "travel", e.uiStartTime = t, e.uiScaleValue = 0);
                        return
                    }
                    if ("travel" === e.uiState) {
                        let a = Math.max(1, e.uiTravelDuration),
                            i = d.M8C.clamp((t - e.uiStartTime) / a, 0, 1),
                            r = (0, Y.Ri)(i, e.uiTravelEasing);
                        e.uiOpacity = 1, e.uiScaleValue = r, e.uiTravelProgress = d.M8C.lerp(e.uiTravelStartT, e.uiTravelEndT, r), i >= 1 && (e.uiState = "outro", e.uiStartTime = t, e.uiScaleValue = 0, this.startArcFinalization(e, t), e.uiOutroStartScale = e.uiCurrentScale ?? 0);
                        return
                    }
                    if ("outro" === e.uiState) {
                        let a = Math.max(1, e.uiOutroDuration),
                            i = (t - e.uiStartTime) / a,
                            r = (0, Y.Ri)(i, e.uiOutroEasing);
                        e.uiOpacity = Math.max(0, 1 - r), e.uiScaleValue = r, e.uiTravelProgress = e.uiTravelEndT, i >= 1 && (e.uiState = "done", e.uiOpacity = 0, e.uiScaleValue = 0)
                    }
                }
                drawArc(e) {
                    let {
                        from: t,
                        to: a,
                        duration: i = 1 / 0,
                        colorStart: r = 16736162,
                        colorEnd: n = 8042751,
                        uiElement: o,
                        currentTime: s
                    } = e, l = this.cityToVector(t, this.arcTempP0), c = this.cityToVector(a, this.arcTempP3), u = this.arcTempU0Orig.copy(l).normalize(), h = this.arcTempU3Orig.copy(c).normalize(), p = this.arcTempChordDir.copy(c).sub(l), m = this.arcTempTangentStart.copy(p).addScaledVector(u, -p.dot(u)).normalize(), f = this.arcTempTangentEnd.copy(p).addScaledVector(h, -p.dot(h)).normalize(), g = this.arcTempP0Final.copy(l).addScaledVector(m, er.MARKER_TANGENT_OFFSET);
                    g.normalize().multiplyScalar(this.radius);
                    let v = this.arcTempP3Final.copy(c).addScaledVector(f, -er.MARKER_TANGENT_OFFSET);
                    v.normalize().multiplyScalar(this.radius);
                    let y = this.arcTempU0.copy(g).normalize(),
                        S = this.arcTempU3.copy(v).normalize(),
                        M = Math.acos(d.M8C.clamp(y.dot(S), -1, 1)),
                        A = d.M8C.clamp(M / Math.PI, 0, 1),
                        P = d.M8C.clamp(A, 0, 1) ** d.M8C.clamp(this.arcPeakAnglePower, .01, 5),
                        b = Math.max(.01, this.arcPeakMinHeight),
                        w = Math.max(b, this.arcPeakMaxHeight),
                        _ = d.M8C.lerp(b, w, P) * this.radius,
                        C = Math.sin(M),
                        x = this.acquireArcPoints();
                    if (!x) return;
                    let {
                        points: E
                    } = x;
                    for (let e = 0; e <= 256; e += 1) {
                        let t = e / 256,
                            a = this.arcTempDir;
                        if (C > 1e-6) {
                            let e = Math.sin((1 - t) * M) / C,
                                i = Math.sin(t * M) / C;
                            a.copy(y).multiplyScalar(e).addScaledVector(S, i).normalize()
                        } else a.copy(y).lerp(S, t).normalize();
                        let i = Math.sin(Math.PI * t) * _;
                        E[e].set(a.x * (this.radius + i), a.y * (this.radius + i), a.z * (this.radius + i))
                    }
                    this.arcPointDistancesPool.length = 0, this.arcPointDistancesPool.push(0);
                    let T = 0;
                    for (let e = 1; e < E.length; e += 1) T += E[e].distanceTo(E[e - 1]), this.arcPointDistancesPool.push(T);
                    this.arcLinePositionsPool.length = 0, this.arcLineColorsPool.length = 0;
                    let z = this.arcColorA.setHex(r),
                        U = this.arcColorB.setHex(n),
                        D = E.length;
                    for (let e = 0; e < D; e += 1) {
                        let t = E[e];
                        this.arcLinePositionsPool.push(t.x, t.y, t.z);
                        let a = e / Math.max(1, D - 1);
                        this.arcColorTemp.copy(z).lerp(U, a), this.arcLineColorsPool.push(this.arcColorTemp.r, this.arcColorTemp.g, this.arcColorTemp.b)
                    }
                    let I = this.arcLinePositionsPool.slice(),
                        k = this.arcLineColorsPool.slice(),
                        R = this.arcPointDistancesPool.slice(),
                        G = this.acquireArcLine();
                    if (!G) {
                        this.releaseArcPoints(x);
                        return
                    }
                    let {
                        line: F,
                        geometry: O,
                        material: L
                    } = G;
                    O.setPositions(I), O.setColors(k);
                    let N = this.cachedWidth || this.canvas.clientWidth,
                        B = this.cachedHeight || this.canvas.clientHeight;
                    L.resolution.set(N, B), L.opacity = 0, F.computeLineDistances();
                    let V = Math.max(1, E.length - 1);
                    O.instanceCount = V, F.visible = !1, L.userData.totalSegments = V, L.userData.visibleRange.set(0, 0), L.userData.u_totalSegmentsUniform && (L.userData.u_totalSegmentsUniform.value = V), L.userData.shader?.uniforms?.u_totalSegments && (L.userData.shader.uniforms.u_totalSegments.value = V);
                    let H = this.acquireMarker(r),
                        K = this.acquireMarker(n);
                    if (!H || !K) {
                        this.releaseArcLine(G), this.releaseArcPoints(x), H && this.releaseMarker(H), K && this.releaseMarker(K);
                        return
                    }
                    let W = this.arcTempTangent.copy(l).normalize(),
                        j = this.arcTempForward.copy(c).normalize();
                    H.position.copy(l), H.scale.setScalar(.02), H.visible = !0, this.arcTempQuat.setFromUnitVectors(this.tempVecA.set(0, 0, 1), W), H.quaternion.copy(this.arcTempQuat);
                    let Z = H.material;
                    Z.opacity = 0, Z.transparent = !0, K.position.copy(c), K.scale.setScalar(.02), K.visible = !0, this.arcTempQuat.setFromUnitVectors(this.tempVecA.set(0, 0, 1), j), K.quaternion.copy(this.arcTempQuat);
                    let $ = K.material;
                    $.opacity = 0, $.transparent = !0;
                    let q = null,
                        X = this.getRandomUIData(t.country);
                    if ("flags" !== this.uiVariant) {
                        let e = o;
                        if (!e && this.uiPool.length > 0) {
                            let t = new Set(this.activeArcs.filter(e => "done" !== e.uiState && e.uiElement).map(e => e.uiElement)),
                                a = this.uiPool.find(e => !t.has(e));
                            a && (e = a, this.activeArcs.forEach(t => {
                                t.uiElement === e && (t.uiElement && (t.uiElement.style.display = "none"), t.uiElement = null, t.uiState = "done", t.uiOpacity = 0)
                            }))
                        }(q = e || this.createArcUIElement()) && (this.updateUIElementContent(q, X.walletIndex, X.amount, X.currencyLabel), q.style.setProperty("--ui-opacity", "0"), q.style.setProperty("--ui-scale", "0"), q.style.setProperty("--ui-x", "0px"), q.style.setProperty("--ui-y", "0px"), e ? q.style.display = "block" : q.style.display = "none")
                    }
                    let Y = this.getCityDistanceKm({
                            lat: t.lat,
                            lon: t.lon
                        }, {
                            lat: a.lat,
                            lon: a.lon
                        }),
                        J = s ?? performance.now(),
                        Q = d.M8C.clamp(Y / 1e4 * en.uiTravel.distanceScale.factor + 1, en.uiTravel.distanceScale.min, en.uiTravel.distanceScale.max),
                        ee = en.uiTravel.durationMs * Q,
                        et = d.M8C.clamp(en.lineDistanceScale.baseDurationMs * (Y / en.lineDistanceScale.referenceKm), en.lineDistanceScale.min, en.lineDistanceScale.max);
                    this.activeArcs.push({
                        mesh: F,
                        points: E,
                        linePositions: I,
                        lineColors: k,
                        startMarker: H,
                        endMarker: K,
                        uiElement: q,
                        start: J,
                        duration: i,
                        markerScale: .2,
                        animation: {
                            startTime: J,
                            markerA: en.markerA.durationMs,
                            markerB: en.markerB.durationMs,
                            line: et,
                            markerAEasing: en.markerA.easing,
                            markerBEasing: en.markerB.easing,
                            lineEasing: en.line.easing
                        },
                        lineSegmentCount: V,
                        lineProgress: 0,
                        pointDistances: R,
                        totalLineLength: T,
                        arcDistanceKm: Y,
                        uiState: "idle",
                        uiStartTime: 0,
                        uiIntroDuration: en.uiIntro.durationMs,
                        uiTravelDuration: ee,
                        uiOutroDuration: en.uiOutro.durationMs,
                        uiIntroEasing: en.uiIntro.easing,
                        uiTravelEasing: en.uiTravel.easing,
                        uiOutroEasing: en.uiOutro.easing,
                        uiOpacity: 0,
                        uiScaleValue: 0,
                        uiTravelProgress: .05,
                        uiTravelStartT: .05,
                        uiTravelEndT: .95,
                        uiCurrentScale: 0,
                        uiOutroStartScale: 0,
                        uiHideFade: 0,
                        finalizeState: "idle",
                        finalizeStartTime: 0,
                        lineRetreatDuration: en.lineRetreat.durationMs,
                        markerFadeDuration: en.markerFade.durationMs,
                        lineRetreatEasing: en.lineRetreat.easing,
                        markerFadeEasing: en.markerFade.easing,
                        lineRetreatProgress: 0,
                        markerFadeProgress: 0,
                        colorStart: new d.Ilk(r),
                        colorEnd: new d.Ilk(n),
                        uiWalletIndex: X.walletIndex,
                        uiAmount: X.amount,
                        uiCurrencyLabel: X.currencyLabel,
                        linePoolItem: G,
                        pointsPoolItem: x,
                        fromCityName: t.name ?? "",
                        toCityName: a.name ?? "",
                        flagStartElement: null,
                        flagEndElement: null,
                        markerAOpacity: 0,
                        markerBOpacity: 0
                    });
                    let ea = this.activeArcs[this.activeArcs.length - 1];
                    return "flags" === this.uiVariant && t.country && a.country && (ea.flagStartElement = this.acquireFlagElement(t.country), ea.flagEndElement = this.acquireFlagElement(a.country)), ea
                }
                createMarkerSet(e) {
                    if (this.markerTextureCache[e]) {
                        let t = this.markerTextureCache[e],
                            a = new d.vBJ({
                                map: t,
                                transparent: !0,
                                depthWrite: !1,
                                depthTest: !0
                            });
                        return new d.Kj0(this.markerGeometry, a)
                    }
                    let t = Math.min(Math.ceil(window.devicePixelRatio || 1), 2),
                        a = new d.Ilk(e),
                        i = e => `rgba(${Math.floor(255*a.r)},${Math.floor(255*a.g)},${Math.floor(255*a.b)},${e})`,
                        r = document.createElement("canvas");
                    r.width = 128 * t, r.height = 128 * t;
                    let n = r.getContext("2d");
                    n.setTransform(t, 0, 0, t, 0, 0), n.clearRect(0, 0, 128, 128), n.fillStyle = i(.25), n.beginPath(), n.arc(64, 64, 64, 0, 2 * Math.PI), n.fill(), n.fillStyle = i(1), n.beginPath(), n.arc(64, 64, 38.4, 0, 2 * Math.PI), n.arc(64, 64, 25.6, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgba(255,255,255,1.0)", n.beginPath(), n.arc(64, 64, 25.6, 0, 2 * Math.PI), n.fill();
                    let o = new d.xEZ(r);
                    o.needsUpdate = !0, o.generateMipmaps = !0, o.minFilter = d.D1R, o.magFilter = d.wem, this.markerTextureCache[e] = o;
                    let s = new d.vBJ({
                        map: o,
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !0
                    });
                    return new d.Kj0(this.markerGeometry, s)
                }
                constructor(e, {
                    uiVariant: t,
                    uiPool: a,
                    flagPool: i,
                    renderFlagContent: r,
                    onError: n,
                    dotCount: o
                }) {
                    this.dpr = 1, this.radius = 2, this.globeRotationMatrix = new d.Vkp, this.globePosition = new d.Pa4(0, 0, 0), this.dotsStartTime = 0, this.uiPool = [], this.uiVariant = "default", this.flagPool = [], this.renderFlagContent = null, this.activeArcs = [], this.arcColorPalettes = [{
                        start: 16747607,
                        end: 16595686
                    }, {
                        start: 7363583,
                        end: 16595686
                    }, {
                        start: 16747607,
                        end: 7363583
                    }], this.simpleArcColorPalettes = [{
                        start: 8443135,
                        end: 5089023
                    }, {
                        start: 16766080,
                        end: 16754253
                    }, {
                        start: 13936383,
                        end: 10898943
                    }], this.arcControllerEnabled = es.ENABLED, this.arcControllerMaxActive = es.MAX_ACTIVE_ARCS, this.arcPeakMinHeight = .1, this.arcPeakMaxHeight = .275, this.arcPeakAnglePower = 1.2, this.arcSpawnIntervalMin = es.MIN_SPAWN_INTERVAL_MS, this.arcSpawnIntervalMax = es.MAX_SPAWN_INTERVAL_MS, this.arcInitialDelayMs = es.INITIAL_DELAY_MS, this.arcCityMinDistanceKm = es.CITY_MIN_DISTANCE_KM, this.arcMinUIScreenDistance = es.MIN_UI_SCREEN_DISTANCE, this.arcMaxSpawnDistanceAttempts = es.MAX_SPAWN_DISTANCE_ATTEMPTS, this.arcVisibleCityDotThreshold = .25, this.arcRightEdgeExclusionRatio = .3, this.arcPreferTranspacific = !0, this.arcPacificWestBoundary = -170, this.arcPacificEastBoundary = 55, this.arcPacificSpeedWestBoundary = -165, this.arcPacificSpeedEastBoundary = 50, this.arcPacificSpeedMultiplier = 1.25, this.arcControllerNextSpawnTime = 0, this.lastArcPairKey = null, this.simpleArcControllerEnabled = !0, this.simpleArcMaxActive = 3, this.simpleArcSpawnIntervalMin = 800, this.simpleArcSpawnIntervalMax = 2e3, this.simpleArcInitialDelayMs = 500, this.simpleArcMaxDistanceKm = 8e3, this.simpleArcMinDistanceKm = 500, this.simpleArcControllerNextSpawnTime = 0, this.lastSimpleArcPairKey = null, this.activeSimpleArcs = [], this.dotDensity = .85, this.dotSize = 12, this.dotColorTop = new d.Ilk(16743487), this.dotColorMid = new d.Ilk(16595686), this.dotColorBottom = new d.Ilk(5454589), this.dotGradientStopTop = .024, this.dotGradientStopMid = .3794, this.dotGradientStopBottom = .7941, this.dotGradientAngle = 225, this.dotGradientWidth = 1, this.dotGradientHeight = 1, this.dotOpacity = .6, this.dotDepthFadeEnabled = !0, this.dotDepthFadeFront = .25, this.dotDepthFadeBack = -.1, this.dotDepthFadeMinOpacity = .15, this.dotDepthFadeCurve = 2, this.dotSizeVariation = .75, this.dotOpacityVariation = .3, this.poissonJitter = .75, this.globeGradientColorA = new d.Ilk(16777215), this.globeGradientColorB = new d.Ilk(24319), this.globeGradientClockAngle = 215, this.globeGradientDepth = -.1, this.globeGradientContrast = 2, this.globeGradientOffset = -.4, this.globeOpacity = .2, this.globeFresnelColor = new d.Ilk(13088490), this.globeFresnelStrength = .1, this.globeFresnelPower = .3, this.atmosphereColor = new d.Ilk("#a953ff"), this.atmosphereIntensity = .08, this.atmosphereOpacity = .35, this.atmosphereFalloff = .4, this.atmosphereRadius = 1.02, this.glowEnabled = !1, this.glowColorA = new d.Ilk("#533afd"), this.glowColorB = new d.Ilk("#ff40b2"), this.glowOpacity = 1, this.glowCenter = new d.FM8(.5, .5), this.glowRadius = new d.FM8(.48, .48), this.dotCoronaParticipation = .2, this.dotCoronaDistance = .6, this.dotCoronaLaunchRate = .15, this.dotCoronaTravelSpeed = .35, this.dotCoronaOpacityDrop = .5, this.dotCoronaNoiseStrength = .42, this.dotCoronaNoiseScale = .75, this.isHovered = !1, this.hoverMultiplier = 1, this.hoverBoostAmount = 1.33, this.hoverAttackSpeed = .1, this.hoverDecaySpeed = .04, this.renderLoop = null, this._paused = !1, this.pauseStartTime = null, this.initialized = !1, this.loaded = !1, this.onLoadCallback = null, this.imagePreloadPromise = null, this.precomputedDots = null, this.dotsPrecomputePromise = null, this.lastRender = null, this.accumulatedTime = 0, this.autoRotate = !0, this.rotationSpeedX = 0, this.rotationSpeedY = .00115, this.currentRotationSpeedY = .00115, this.rotationSpeedZ = 0, this.globeAxisTiltX = -2, this.globeAxisTiltZ = 8, this.globeInitialRotationY = 70, this.tempVecA = new d.Pa4, this.tempVecB = new d.Pa4, this.tempVecC = new d.Pa4, this.tempVecD = new d.Pa4, this.tempVecE = new d.Pa4, this.tempVecF = new d.Pa4, this.tempVecG = new d.Pa4, this.tempVecH = new d.Pa4, this.tempVecI = new d.Pa4, this.tempVecJ = new d.Pa4, this.tempVecK = new d.Pa4, this.tempArcFactors = new d.FM8, this._proj = {
                        x: 0,
                        y: 0,
                        depthFade: 0,
                        isBehindGlobe: !1,
                        isOffscreen: !1
                    }, this.arcTempP0 = new d.Pa4, this.arcTempP3 = new d.Pa4, this.arcTempU0 = new d.Pa4, this.arcTempU3 = new d.Pa4, this.arcTempDir = new d.Pa4, this.arcTempTangent = new d.Pa4, this.arcTempForward = new d.Pa4, this.arcColorA = new d.Ilk, this.arcColorB = new d.Ilk, this.arcColorTemp = new d.Ilk, this.arcTempQuat = new d._fP, this.arcTempU0Orig = new d.Pa4, this.arcTempU3Orig = new d.Pa4, this.arcTempChordDir = new d.Pa4, this.arcTempTangentStart = new d.Pa4, this.arcTempTangentEnd = new d.Pa4, this.arcTempP0Final = new d.Pa4, this.arcTempP3Final = new d.Pa4, this.arcPointDistancesPool = [], this.arcLinePositionsPool = [], this.arcLineColorsPool = [], this.visibleCityIndicesCache = [], this.candidateCityIndices = [], this.cityVectors = [], this.markerTextureCache = {}, this.markerGeometry = new d._12(.4, .4), this.cachedWidth = 0, this.cachedHeight = 0, this.ARC_LINE_POOL_SIZE = 10, this.ARC_MAX_SEGMENTS = 256, this.arcLinePool = [], this.arcLinePoolInitialized = !1, this.SIMPLE_ARC_LINE_POOL_SIZE = 6, this.SIMPLE_ARC_MAX_SEGMENTS = 64, this.simpleArcLinePool = [], this.simpleArcLinePoolInitialized = !1, this.MARKER_POOL_SIZE = 20, this.markerPool = [], this.markerPoolInitialized = !1, this.arcPointsPool = [], this.arcPointsPoolInitialized = !1, this.simpleArcPointsPool = [], this.simpleArcPointsPoolInitialized = !1, this.tempCityVec = new d.Pa4, this.animate = e => {
                        if (this._paused || !this.loaded) return;
                        let t = performance.now();
                        null === this.lastRender && (this.lastRender = t);
                        let a = (t - this.lastRender) / 1e3;
                        a = Math.min(a, .05), this.lastRender = t, this.accumulatedTime += a, this.updateAndRender(a, t)
                    }, this.updateUI = () => {
                        if (this._paused || !this.loaded) return;
                        let e = performance.now();
                        this.updateArcsConsolidated(e), this.updateSimpleArcsConsolidated(e), this.updateArcController(e), this.updateSimpleArcController(e)
                    }, (0, J.g)();
                    let {
                        renderer: s,
                        hasMajorPerformanceCaveat: l,
                        hasRequiredCapabilities: c
                    } = (0, ei.Us)({
                        canvas: e,
                        antialias: !0,
                        alpha: !1,
                        powerPreference: "high-performance",
                        failIfMajorPerformanceCaveat: !0
                    });
                    if (!s || !c || l) throw Error("WebGL disabled based on capabilities check");
                    this.dpr = Math.min(window.devicePixelRatio, 2), this.renderer = s, this.renderer.setClearColor(16777215, 1), this.renderer.setPixelRatio(this.dpr), this.canvas = e, this.uiVariant = t, this.uiPool = a, this.flagPool = i, this.renderFlagContent = r, this.onError = n, this.dotSize = (0, Q.t)() ? er.DOT_SIZE_MOBILE : er.DOT_SIZE_DESKTOP, this.arcCityMinDistanceKm = "flags" === this.uiVariant ? 3e3 : es.CITY_MIN_DISTANCE_KM, this.scene = new d.xsS, this.camera = new d.cPb(25, 1, .1, 1e3), this.candidateCityIndices = "flags" === this.uiVariant ? ef.filter(e => !ec.includes(el[e].country)) : el.map((e, t) => t), this.dotCountOverride = o, void 0 === o && ea.y.dots ? (this.precomputedDots = ea.y.dots, this.dotsPrecomputePromise = Promise.resolve(ea.y.dots)) : void 0 === o && ea.y.promise ? this.dotsPrecomputePromise = ea.y.promise.then(e => (this.precomputedDots = e, e)) : this.startImagePreload()
                }
                startImagePreload() {
                    this.imagePreloadPromise = new Promise(e => {
                        new d.S3k().load(er.IMAGE_PATH, t => {
                            let a = function(e) {
                                let t = e.width,
                                    a = e.height,
                                    i = document.createElement("canvas");
                                i.width = t, i.height = a;
                                let r = i.getContext("2d");
                                return r.drawImage(e, 0, 0), r.getImageData(0, 0, t, a)
                            }(t);
                            e(a), this.startDotsPrecompute(a)
                        })
                    })
                }
                startDotsPrecompute(e) {
                    this.dotsPrecomputePromise = this.generateDotsAsync(e).then(e => (this.precomputedDots = e, e))
                }
                initScene() {
                    if (this.initialized) return;
                    this.initialized = !0;
                    let e = this.cachedWidth || this.canvas.clientWidth,
                        t = this.cachedHeight || this.canvas.clientHeight;
                    this.renderer.setSize(e, t, !1), this.camera.aspect = e / t || 1, this.camera.updateProjectionMatrix();
                    let a = (0, Q.t)() ? er.CAMERA_Z_MOBILE : er.CAMERA_Z_DESKTOP;
                    this.camera.position.set(0, 0, a), this.camera.lookAt(0, 0, 0), this.createGlobe();
                    let i = 0,
                        r = 2;
                    this.renderLoop = (0, ei.K7)(e => {
                        i % r == 0 && this.animate(e), this.updateUI(), i += 1
                    }), this.renderLoop.onPerformanceWarning = e => {
                        r = Math.max(e + 1, r)
                    }, this.renderLoop.onPerformanceRecovered = e => {
                        r = Math.max(e + 1, 2)
                    }, this.renderLoop.start()
                }
                createGlobe() {
                    this.globeGroup = new d.ZAu, this.globeGroup.position.copy(this.globePosition), this.globeGroup.rotation.x = d.M8C.degToRad(this.globeAxisTiltX), this.globeGroup.rotation.y = d.M8C.degToRad(this.globeInitialRotationY), this.globeGroup.rotation.z = d.M8C.degToRad(this.globeAxisTiltZ), this.scene.add(this.globeGroup);
                    let e = new d.xo$(.993 * this.radius, 64, 64),
                        t = new d.vBJ({
                            transparent: !0,
                            opacity: 0,
                            side: d.Wl3,
                            depthWrite: !0,
                            colorWrite: !1
                        });
                    this.backgroundSphere = new d.Kj0(e, t), this.backgroundSphere.renderOrder = -1, this.globeGroup.add(this.backgroundSphere);
                    let a = 6 * this.radius,
                        i = new d._12(a, a, 1, 1);
                    if (this.atmosphereMaterial = new d.jyz({
                            uniforms: {
                                u_color: {
                                    value: this.atmosphereColor.clone()
                                },
                                u_intensity: {
                                    value: this.atmosphereIntensity
                                },
                                u_opacity: {
                                    value: this.atmosphereOpacity
                                },
                                u_innerRadius: {
                                    value: this.radius
                                },
                                u_outerRadius: {
                                    value: this.radius * this.atmosphereRadius
                                },
                                u_outerFade: {
                                    value: Math.max(.01, this.atmosphereFalloff) * this.radius
                                }
                            },
                            vertexShader: G(),
                            fragmentShader: O(),
                            blending: d.bdR,
                            transparent: !0,
                            depthWrite: !1,
                            depthTest: !1,
                            side: d.ehD
                        }), this.atmosphereMesh = new d.Kj0(i, this.atmosphereMaterial), this.atmosphereMesh.frustumCulled = !1, this.atmosphereMesh.renderOrder = -4, this.scene.add(this.atmosphereMesh), this.glowEnabled) {
                        let e = new d._12(1, 1, 1, 1);
                        this.glowMaterial = new d.jyz({
                            uniforms: {
                                u_colorA: {
                                    value: this.glowColorA.clone()
                                },
                                u_colorB: {
                                    value: this.glowColorB.clone()
                                },
                                u_center: {
                                    value: this.glowCenter.clone()
                                },
                                u_radius: {
                                    value: this.glowRadius.clone()
                                },
                                u_opacity: {
                                    value: this.glowOpacity
                                }
                            },
                            vertexShader: $(),
                            fragmentShader: X(),
                            blending: d.bdR,
                            transparent: !0,
                            depthWrite: !1,
                            depthTest: !0,
                            side: d.ehD
                        }), this.glowMesh = new d.Kj0(e, this.glowMaterial), this.glowMesh.frustumCulled = !1, this.glowMesh.renderOrder = -.5, this.scene.add(this.glowMesh), this.updateGlowPlaneSize()
                    }
                    let r = new d.xo$(.9995 * this.radius, 128, 128);
                    this.globeSurfaceMaterial = new d.jyz({
                        uniforms: {
                            u_colorA: {
                                value: this.globeGradientColorA.clone()
                            },
                            u_colorB: {
                                value: this.globeGradientColorB.clone()
                            },
                            u_fresnelColor: {
                                value: this.globeFresnelColor.clone()
                            },
                            u_fresnelStrength: {
                                value: this.globeFresnelStrength
                            },
                            u_fresnelPower: {
                                value: this.globeFresnelPower
                            },
                            u_opacity: {
                                value: this.globeOpacity
                            },
                            u_gradientDir: {
                                value: new d.Pa4(1, 0, 0)
                            },
                            u_gradientContrast: {
                                value: this.globeGradientContrast
                            },
                            u_gradientOffset: {
                                value: this.globeGradientOffset
                            },
                            u_cameraPosition: {
                                value: this.camera.position.clone()
                            },
                            u_cameraRight: {
                                value: new d.Pa4(1, 0, 0)
                            },
                            u_cameraUp: {
                                value: new d.Pa4(0, 1, 0)
                            },
                            u_cameraForward: {
                                value: new d.Pa4(0, 0, -1)
                            }
                        },
                        vertexShader: N(),
                        fragmentShader: V(),
                        transparent: !0,
                        depthWrite: !0,
                        depthTest: !0
                    }), this.globeSurface = new d.Kj0(r, this.globeSurfaceMaterial), this.globeSurface.renderOrder = -.5, this.globeGroup.add(this.globeSurface), this.updateGlobeSurfaceUniforms(), this.updateCameraBasisUniforms(), this.updateAtmosphereMaterial(), this.arcsGroup = new d.ZAu, this.arcsGroup.rotation.x = -Math.PI, this.arcsGroup.rotation.z = -Math.PI, this.globeGroup.add(this.arcsGroup), this.dotsGroup = new d.ZAu, this.dotsGroup.rotation.x = -Math.PI, this.dotsGroup.rotation.z = -Math.PI, this.globeGroup.add(this.dotsGroup), this.loadDotsImage(), this.cityVectors = el.map(e => new d.Pa4(e.ux, e.uy, e.uz).multiplyScalar(this.radius)), this.globeGroup.updateMatrixWorld(!0), this.globeRotationMatrix.setFromMatrix4(this.globeGroup.matrixWorld), this.globeRotationMatrix.transpose()
                }
                loadDotsImage() {
                    let e = e => {
                        if (this.applyDotsToScene(e), this.loaded = !0, this.onLoadCallback && (this.onLoadCallback(), this.onLoadCallback = null), this.paused) {
                            let e = performance.now();
                            this.updateAndRender(0, e)
                        }
                    };
                    this.precomputedDots ? e(this.precomputedDots) : this.dotsPrecomputePromise ? this.dotsPrecomputePromise.then(t => {
                        e(t)
                    }) : this.imagePreloadPromise ? this.imagePreloadPromise.then(() => {
                        this.dotsPrecomputePromise && this.dotsPrecomputePromise.then(e)
                    }) : (this.startImagePreload(), this.imagePreloadPromise.then(() => {
                        this.dotsPrecomputePromise.then(e)
                    }))
                }
                resolveDotCount() {
                    let e = er.DOT_COUNT_MAX_MOBILE / er.DOT_COUNT_MAX_DESKTOP;
                    return void 0 !== this.dotCountOverride ? (0, Q.t)() ? Math.round(this.dotCountOverride * e) : this.dotCountOverride : (0, Q.t)() ? er.DOT_COUNT_MAX_MOBILE : er.DOT_COUNT_MAX_DESKTOP
                }
                generateDotsAsync(e) {
                    let t = {
                        imageWidth: e.width,
                        imageHeight: e.height,
                        imageData: e.data,
                        dotCount: this.resolveDotCount(),
                        radius: this.radius,
                        poissonJitter: this.poissonJitter,
                        dotSizeVariation: this.dotSizeVariation,
                        dotOpacityVariation: this.dotOpacityVariation
                    };
                    if ("undefined" != typeof Worker) try {
                        let e = new Worker(et.Z);
                        return new Promise(a => {
                            e.onmessage = t => {
                                e.terminate(), a(t.data)
                            }, e.onerror = i => {
                                this.onError?.(Error(i.message), {
                                    component: "GradientNoiseGlobe",
                                    workerType: "dotGeneration",
                                    errorType: "worker_error"
                                }), e.terminate();
                                let r = (0, ee.A)(t);
                                a(r)
                            }, e.postMessage(t)
                        })
                    } catch (e) {
                        return this.onError?.(e instanceof Error ? e : Error(String(e)), {
                            component: "GradientNoiseGlobe",
                            workerType: "dotGeneration",
                            errorType: "worker_creation_failed"
                        }), Promise.resolve((0, ee.A)(t))
                    }
                    return Promise.resolve((0, ee.A)(t))
                }
                applyDotsToScene(e) {
                    let t = new d.u9r;
                    t.setAttribute("position", new d.a$l(e.positions, 3)), t.setAttribute("rndId", new d.a$l(e.rndIds, 1)), t.setAttribute("sizeVariation", new d.a$l(e.sizeVariations, 1)), t.setAttribute("opacityVariation", new d.a$l(e.opacityVariations, 1)), t.setAttribute("coronaSeed", new d.a$l(e.coronaSeeds, 1)), t.setAttribute("varianceRate", new d.a$l(e.varianceRates, 1)), t.setAttribute("varianceMotion", new d.a$l(e.varianceMotions, 1)), t.setAttribute("coronaCanParticipate", new d.a$l(e.coronaCanParticipate, 1));
                    let a = Math.max(.1, this.dotCoronaTravelSpeed),
                        i = Math.max(.45, 1 / Math.max(this.dotCoronaLaunchRate, .001));
                    this.dotsMaterial = new d.jyz({
                        transparent: !0,
                        depthTest: !1,
                        depthWrite: !1,
                        uniforms: {
                            u_timeSec: {
                                value: 0
                            },
                            u_radius: {
                                value: this.radius
                            },
                            u_dotSize: {
                                value: .01 * this.dotSize
                            },
                            u_opacity_factor: {
                                value: this.dotOpacity
                            },
                            u_coronaBurstDistance: {
                                value: this.dotCoronaDistance
                            },
                            u_coronaParticipation: {
                                value: this.dotCoronaParticipation
                            },
                            u_coronaOpacityDrop: {
                                value: this.dotCoronaOpacityDrop
                            },
                            u_coronaNoiseStrength: {
                                value: this.dotCoronaNoiseStrength
                            },
                            u_coronaNoiseScale: {
                                value: this.dotCoronaNoiseScale
                            },
                            u_coronaBaseFlightDur: {
                                value: Math.min(20, Math.max(.3, 3.1 / a))
                            },
                            u_coronaBaseFadeDur: {
                                value: Math.min(20, Math.max(.05, .6 / a))
                            },
                            u_coronaLaunchInterval: {
                                value: i
                            },
                            u_canvasHeight: {
                                value: this.cachedHeight || this.canvas.clientHeight
                            },
                            u_pixelRatio: {
                                value: this.dpr
                            },
                            u_depthFadeEnabled: {
                                value: this.dotDepthFadeEnabled ? 1 : 0
                            },
                            u_depthFadeFront: {
                                value: this.dotDepthFadeFront
                            },
                            u_depthFadeBack: {
                                value: this.dotDepthFadeBack
                            },
                            u_depthFadeMin: {
                                value: this.dotDepthFadeMinOpacity
                            },
                            u_depthFadeCurve: {
                                value: this.dotDepthFadeCurve
                            },
                            u_gradientAngle: {
                                value: this.dotGradientAngle
                            },
                            u_gradientScale: {
                                value: new d.FM8(Math.max(.05, this.dotGradientWidth), Math.max(.05, this.dotGradientHeight))
                            },
                            u_cameraRight: {
                                value: new d.Pa4(1, 0, 0)
                            },
                            u_cameraUp: {
                                value: new d.Pa4(0, 1, 0)
                            },
                            u_cameraForward: {
                                value: new d.Pa4(0, 0, -1)
                            },
                            u_cameraPosition: {
                                value: new d.Pa4
                            },
                            u_gradientStops: {
                                value: new Float32Array(er.DOT_GRADIENT_STOP_COUNT)
                            },
                            u_gradientColors: {
                                value: Array.from({
                                    length: er.DOT_GRADIENT_STOP_COUNT
                                }, () => new d.Ilk(16777215))
                            }
                        },
                        vertexShader: K(),
                        fragmentShader: j()
                    }), this.updateDotGradientUniforms(), this.updateDotDepthFadeUniforms();
                    let r = new d.woe(t, this.dotsMaterial);
                    for (; this.dotsGroup.children.length > 0;) {
                        let e = this.dotsGroup.children[0];
                        this.dotsGroup.remove(e), e.geometry?.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach(e => e.dispose()) : e.material.dispose())
                    }
                    this.dotsGroup.add(r), this.dotsStartTime = performance.now()
                }
                updateGlobeSurfaceUniforms() {
                    if (!this.globeSurfaceMaterial) return;
                    let {
                        uniforms: e
                    } = this.globeSurfaceMaterial;
                    e.u_colorA.value.copy(this.globeGradientColorA), e.u_colorB.value.copy(this.globeGradientColorB), e.u_fresnelColor.value.copy(this.globeFresnelColor), e.u_fresnelStrength.value = this.globeFresnelStrength, e.u_fresnelPower.value = this.globeFresnelPower, e.u_opacity.value = this.globeOpacity, e.u_gradientContrast.value = this.globeGradientContrast, e.u_gradientOffset.value = this.globeGradientOffset, e.u_cameraPosition.value.copy(this.camera.position), e.u_gradientDir.value.copy(this.getGradientDirectionCamera()), this.globeSurfaceMaterial.needsUpdate = !0
                }
                getGradientDirectionCamera() {
                    let e = d.M8C.degToRad(this.globeGradientClockAngle),
                        t = this.tempVecI.set(Math.sin(e), Math.cos(e), 0),
                        a = d.M8C.clamp(this.globeGradientDepth, -1, 1);
                    return this.tempVecJ.copy(t).multiplyScalar(1 - Math.abs(a)).add(this.tempVecG.set(0, 0, -a)).normalize()
                }
                updateAtmosphereMaterial() {
                    if (!this.atmosphereMaterial || !this.atmosphereMesh) return;
                    let {
                        uniforms: e
                    } = this.atmosphereMaterial;
                    e.u_color.value.copy(this.atmosphereColor), e.u_intensity.value = this.atmosphereIntensity, e.u_opacity.value = this.atmosphereOpacity, e.u_innerRadius.value = this.radius, e.u_outerRadius.value = this.radius * this.atmosphereRadius, e.u_outerFade.value = Math.max(.01, this.atmosphereFalloff) * this.radius, this.atmosphereMesh.position.copy(this.globeGroup.position), this.atmosphereMaterial.needsUpdate = !0
                }
                updateDotDepthFadeUniforms() {
                    if (!this.dotsMaterial) return;
                    let e = this.dotsMaterial.uniforms;
                    e.u_depthFadeEnabled && (e.u_depthFadeEnabled.value = this.dotDepthFadeEnabled ? 1 : 0, e.u_depthFadeFront.value = this.dotDepthFadeFront, e.u_depthFadeBack.value = this.dotDepthFadeBack, e.u_depthFadeMin.value = this.dotDepthFadeMinOpacity, e.u_depthFadeCurve.value = Math.max(.01, this.dotDepthFadeCurve))
                }
                updateDotGradientUniforms() {
                    if (!this.dotsMaterial) return;
                    let e = this.dotsMaterial.uniforms;
                    e.u_gradientStops && e.u_gradientColors && e.u_gradientAngle && e.u_gradientScale && (e.u_gradientStops.value[0] = d.M8C.clamp(this.dotGradientStopTop, 0, 1), e.u_gradientStops.value[1] = d.M8C.clamp(this.dotGradientStopMid, 0, 1), e.u_gradientStops.value[2] = d.M8C.clamp(this.dotGradientStopBottom, 0, 1), e.u_gradientColors.value[0].copy(this.dotColorTop), e.u_gradientColors.value[1].copy(this.dotColorMid), e.u_gradientColors.value[2].copy(this.dotColorBottom), e.u_gradientAngle.value = this.dotGradientAngle, e.u_gradientScale.value.set(Math.max(.05, this.dotGradientWidth), Math.max(.05, this.dotGradientHeight)))
                }
                updateCameraBasisUniforms() {
                    let e = this.tempVecH,
                        t = this.tempVecG,
                        a = this.tempVecF;
                    if (this.camera.matrixWorld.extractBasis(e, t, a), a.negate(), this.dotsMaterial && (this.dotsMaterial.uniforms.u_cameraRight.value.copy(e), this.dotsMaterial.uniforms.u_cameraUp.value.copy(t), this.dotsMaterial.uniforms.u_cameraForward.value.copy(a)), this.globeSurfaceMaterial) {
                        let {
                            uniforms: i
                        } = this.globeSurfaceMaterial;
                        i.u_cameraRight.value.copy(e), i.u_cameraUp.value.copy(t), i.u_cameraForward.value.copy(a)
                    }
                }
                updateAndRender(e, t) {
                    this.updateCameraBasisUniforms(), this.globeSurfaceMaterial && (this.globeSurfaceMaterial.uniforms.u_cameraPosition.value.copy(this.camera.position), this.globeSurfaceMaterial.uniforms.u_gradientDir.value.copy(this.getGradientDirectionCamera())), this.atmosphereMaterial && (this.atmosphereMesh?.quaternion.copy(this.camera.quaternion), this.atmosphereMesh?.position.copy(this.globeGroup.position));
                    let a = this.isHovered ? this.hoverBoostAmount : 1;
                    if (!(.001 > Math.abs(this.hoverMultiplier - a))) {
                        let e = this.isHovered ? this.hoverAttackSpeed : this.hoverDecaySpeed;
                        if (this.hoverMultiplier = d.M8C.clamp(d.M8C.lerp(this.hoverMultiplier, a, e), 1, this.hoverBoostAmount), this.dotsMaterial) {
                            let e = this.dotsMaterial.uniforms;
                            e.u_coronaBurstDistance && (e.u_coronaBurstDistance.value = this.dotCoronaDistance * this.hoverMultiplier), e.u_coronaParticipation && (e.u_coronaParticipation.value = Math.min(1, this.dotCoronaParticipation * this.hoverMultiplier))
                        }
                    }
                    let i = (performance.now() - this.dotsStartTime) * .001;
                    if (this.dotsMaterial && (this.dotsMaterial.uniforms.u_timeSec.value = i + 100, this.dotsMaterial.uniforms.u_cameraPosition.value.copy(this.camera.position)), this.autoRotate && this.globeGroup) {
                        let t = this.isPacificForSpeedAcceleration() ? this.rotationSpeedY * this.arcPacificSpeedMultiplier : this.rotationSpeedY;
                        this.currentRotationSpeedY = d.M8C.lerp(this.currentRotationSpeedY, t, .01), this.globeGroup.rotation.x += this.rotationSpeedX * e * 60, this.globeGroup.rotation.y += this.currentRotationSpeedY * e * 60, this.globeGroup.rotation.z += this.rotationSpeedZ * e * 60
                    }
                    this.globeGroup && (this.globeGroup.updateMatrixWorld(!0), this.arcsGroup?.updateMatrixWorld(!0), this.globeRotationMatrix.setFromMatrix4(this.globeGroup.matrixWorld), this.globeRotationMatrix.transpose()), this.renderer.render(this.scene, this.camera)
                }
                shiftTimestamps(e) {
                    for (let t of (this.dotsStartTime += e, this.activeArcs)) t.animation.startTime += e, t.uiStartTime += e, t.finalizeStartTime += e;
                    for (let t of this.activeSimpleArcs) t.animation.startTime += e, t.finalizeStartTime += e;
                    this.arcControllerNextSpawnTime > 0 && (this.arcControllerNextSpawnTime += e), this.simpleArcControllerNextSpawnTime > 0 && (this.simpleArcControllerNextSpawnTime += e)
                }
                get paused() {
                    return this._paused
                }
                set paused(e) {
                    if (e !== this._paused) {
                        if (e) this.pauseStartTime = performance.now(), this.lastRender = null;
                        else if (null !== this.pauseStartTime) {
                            let e = performance.now() - this.pauseStartTime;
                            this.shiftTimestamps(e), this.pauseStartTime = null
                        }
                        this._paused = e
                    }
                }
                setHovered(e) {
                    this.isHovered = e
                }
                onLoad(e) {
                    this.loaded ? e() : this.onLoadCallback = e
                }
                setSize(e, t) {
                    this.cachedWidth = e, this.cachedHeight = t, this.resize()
                }
                updateGlowPlaneSize() {
                    if (!this.glowMesh) return;
                    let e = 2 * this.camera.position.z * Math.tan(d.M8C.degToRad(this.camera.fov) / 2),
                        t = e * this.camera.aspect;
                    this.glowMesh.scale.set(t, e, 1)
                }
                resize() {
                    let e = this.cachedWidth,
                        t = this.cachedHeight;
                    e && t && (this.dpr = Math.min(window.devicePixelRatio, 2), this.renderer.setSize(e, t, !1), this.renderer.setPixelRatio(this.dpr), this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.updateGlowPlaneSize(), this.dotsMaterial && (this.dotsMaterial.uniforms.u_canvasHeight.value = t, this.dotsMaterial.uniforms.u_pixelRatio.value = this.dpr), this.arcsGroup?.children.forEach(a => {
                        let i = a.material;
                        i && i.isLineMaterial && i.resolution && i.resolution.set(e, t)
                    }))
                }
                dispose() {
                    this.renderLoop && this.renderLoop.stop(), this.renderLoop = null, this.dotsMaterial?.dispose(), this.renderer?.dispose(), this.backgroundSphere && (this.backgroundSphere.geometry.dispose(), this.backgroundSphere.material.dispose()), this.globeSurface && (this.globeSurface.geometry.dispose(), this.globeSurface.material.dispose(), this.globeSurface = void 0, this.globeSurfaceMaterial = void 0), this.atmosphereMesh && (this.atmosphereMesh.parent?.remove(this.atmosphereMesh), this.atmosphereMesh.geometry.dispose(), this.atmosphereMesh.material.dispose(), this.atmosphereMesh = void 0, this.atmosphereMaterial = void 0), this.glowMesh && (this.glowMesh.parent?.remove(this.glowMesh), this.glowMesh.geometry.dispose(), this.glowMesh.material.dispose(), this.glowMesh = void 0, this.glowMaterial = void 0), this.activeArcs.forEach(e => {
                        e.linePoolItem && this.releaseArcLine(e.linePoolItem), e.startMarker && this.releaseMarker(e.startMarker), e.endMarker && this.releaseMarker(e.endMarker), e.uiElement && (e.uiElement.style.display = "none"), e.flagStartElement && (e.flagStartElement.style.display = "none"), e.flagEndElement && (e.flagEndElement.style.display = "none")
                    }), this.activeArcs = [], this.flagPool?.forEach(e => {
                        e.style.display = "none"
                    }), this.activeSimpleArcs.forEach(e => {
                        this.disposeArcResources(e)
                    }), this.activeSimpleArcs = [], this.arcLinePool.forEach(e => {
                        this.arcsGroup?.remove(e.line), e.geometry.dispose(), e.material.dispose()
                    }), this.arcLinePool = [], this.arcLinePoolInitialized = !1, this.simpleArcLinePool.forEach(e => {
                        this.arcsGroup?.remove(e.line), e.geometry.dispose(), e.material.dispose()
                    }), this.simpleArcLinePool = [], this.simpleArcLinePoolInitialized = !1, this.arcPointsPool = [], this.arcPointsPoolInitialized = !1, this.simpleArcPointsPool = [], this.simpleArcPointsPoolInitialized = !1, this.markerPool.forEach(e => {
                        this.arcsGroup?.remove(e.mesh), e.mesh.material?.dispose?.()
                    }), this.markerPool = [], this.markerPoolInitialized = !1, Object.values(this.markerTextureCache).forEach(e => e.dispose()), this.markerTextureCache = {}, this.markerGeometry.dispose(), this.dotsGroup?.children.forEach(e => {
                        e.geometry?.dispose?.(), e.material?.dispose?.()
                    })
                }
            }