import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { ShoppingBag, X, Globe, Menu, ChevronRight, MapPin, Phone, Mail, Instagram, Facebook, Upload, Lock, Check, Loader2 } from 'lucide-react';

// --- CONFIGURACIÓN SANITY ---
const projectId = 'oj4ng9ri';
const dataset = 'production';
const token = 'SkNCFmXWp0QJFzp1iV1xGFDaI11JyonNvydiqP7fK8ycnJNg1uxK6HHrQYg95eFSzxMve0v3fGImAxlqVVIC90GgeZfFPavpRebUvXM20OSVtm8i6hRuikPugR7EZAI2c1gQ9l0SSbSSge9nC5xCBNQ5ypgJmFtpLqo1nxtZNYooJWjlqt2v';

const client = createClient({
  projectId
